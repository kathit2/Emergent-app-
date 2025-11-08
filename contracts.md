# API Contracts & Integration Guide

## Current Mock Data

### Frontend Mock (`/app/frontend/src/data/mock.js`)
- **Projects data**: 9 complete project entries with details
- **Qualifications**: 2 entries (UKSCA, BSc)
- **Specializations**: 6 areas with icons
- **Tools**: 11 technology badges

### Frontend Mock Behavior (`/app/frontend/src/pages/Home.jsx`)
- **Contact Form**: Currently shows toast message on submit, doesn't send data
  - Form fields: name, email, message
  - Mock timeout: 1 second
  - Shows success toast after submission

---

## Backend Implementation Plan

### 1. Database Models

#### ContactMessage Model
```python
{
  "_id": ObjectId,
  "name": str (required),
  "email": str (required, email format),
  "message": str (required),
  "created_at": datetime (auto),
  "status": str (default: "new"),  # new, read, archived
}
```

### 2. API Endpoints

#### POST /api/contact
**Purpose**: Submit contact form

**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

**Response** (Success - 200):
```json
{
  "success": true,
  "message": "Message sent successfully",
  "id": "message_id"
}
```

**Response** (Error - 400/500):
```json
{
  "success": false,
  "error": "Error message"
}
```

**Validations**:
- Name: required, min 2 chars
- Email: required, valid email format
- Message: required, min 10 chars

#### GET /api/contact (Optional - for admin)
**Purpose**: Retrieve all contact messages
**Response**: Array of contact messages

---

## Email Integration

### Options:
1. **SMTP (Gmail/Custom)** - Simple email sending
2. **SendGrid** - Professional email service
3. **No email** - Just store in database

**Decision needed from user**: Which email service to use?

---

## Frontend-Backend Integration

### Changes needed in `/app/frontend/src/pages/Home.jsx`:

**Current (Mock)**:
```javascript
setTimeout(() => {
  toast({ title: "Message sent!", description: "..." });
  setFormData({ name: '', email: '', message: '' });
  setIsSubmitting(false);
}, 1000);
```

**After Backend Integration**:
```javascript
const response = await axios.post(`${API}/contact`, formData);
if (response.data.success) {
  toast({ title: "Message sent!", description: "..." });
  setFormData({ name: '', email: '', message: '' });
}
setIsSubmitting(false);
```

---

## Implementation Steps

1. ✅ Create MongoDB model for ContactMessage
2. ✅ Create POST /api/contact endpoint with validation
3. ✅ User chose database-only storage (no email for now)
4. ✅ Update frontend to call real API
5. ⏳ Test end-to-end flow (in progress)
6. ✅ Error handling and user feedback implemented

---

## Testing Checklist

- [ ] Form validation (empty fields)
- [ ] Email format validation
- [ ] Successful submission
- [ ] Data stored in MongoDB
- [ ] Email sent (if implemented)
- [ ] Error handling (network failure, server error)
- [ ] Toast notifications work
- [ ] Form resets after successful submission
