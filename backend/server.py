from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2)
    email: str = Field(...)
    message: str = Field(..., min_length=10)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = Field(default="new")

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr = Field(...)
    message: str = Field(..., min_length=10)

# Email sending function
async def send_contact_email(name: str, email: str, message: str):
    """Send email notification when contact form is submitted"""
    try:
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port = int(os.environ.get('SMTP_PORT', 587))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        smtp_from_email = os.environ.get('SMTP_FROM_EMAIL')
        smtp_from_name = os.environ.get('SMTP_FROM_NAME', 'Portfolio Contact')
        
        if not all([smtp_host, smtp_user, smtp_password, smtp_from_email]):
            logger.warning("Email configuration incomplete, skipping email send")
            return False
        
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'New Contact Form Submission from {name}'
        msg['From'] = f'{smtp_from_name} <{smtp_from_email}>'
        msg['To'] = smtp_from_email
        msg['Reply-To'] = email
        
        # Create HTML email body
        html_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px;">
                    New Contact Form Submission
                </h2>
                
                <div style="margin: 20px 0;">
                    <p style="margin: 10px 0;"><strong style="color: #555;">Name:</strong> {name}</p>
                    <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> <a href="mailto:{email}">{email}</a></p>
                </div>
                
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #00D9FF; margin: 20px 0;">
                    <p style="margin: 0 0 10px 0;"><strong style="color: #555;">Message:</strong></p>
                    <p style="margin: 0; white-space: pre-wrap;">{message}</p>
                </div>
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #777; font-size: 12px;">
                    <p>This message was sent from your portfolio website contact form.</p>
                    <p>Received at: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Attach HTML body
        html_part = MIMEText(html_body, 'html')
        msg.attach(html_part)
        
        # Send email
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        logger.info(f"Email notification sent for contact from {email}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email notification: {str(e)}")
        return False

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/contact")
async def create_contact_message(contact: ContactMessageCreate):
    try:
        # Create contact message object
        contact_dict = contact.dict()
        contact_obj = ContactMessage(**contact_dict)
        
        # Insert into database
        result = await db.contact_messages.insert_one(contact_obj.dict())
        
        if result.inserted_id:
            logger.info(f"Contact message received from {contact.email}")
            return {
                "success": True,
                "message": "Message sent successfully! I'll get back to you soon.",
                "id": contact_obj.id
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to save message")
            
    except Exception as e:
        logger.error(f"Error saving contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send message. Please try again.")

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages (for admin use)"""
    try:
        messages = await db.contact_messages.find().sort("created_at", -1).to_list(1000)
        return [ContactMessage(**msg) for msg in messages]
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch messages")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()