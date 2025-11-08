import requests
import json
from datetime import datetime

# Backend URL from environment
BACKEND_URL = "https://strengthanalytics.preview.emergentagent.com/api"

def print_test_header(test_name):
    print("\n" + "="*80)
    print(f"TEST: {test_name}")
    print("="*80)

def print_result(success, message):
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status}: {message}")

def test_post_contact_valid():
    """Test POST /api/contact with valid data"""
    print_test_header("POST /api/contact - Valid Submission")
    
    url = f"{BACKEND_URL}/contact"
    payload = {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "message": "This is a test message from automated testing. I'm interested in learning more about your services."
    }
    
    try:
        response = requests.post(url, json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") == True and "id" in data:
                print_result(True, "Valid contact message submitted successfully")
                return data.get("id")
            else:
                print_result(False, "Response missing required fields (success, id)")
                return None
        else:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return None
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return None

def test_post_contact_invalid_email():
    """Test POST /api/contact with invalid email"""
    print_test_header("POST /api/contact - Invalid Email")
    
    url = f"{BACKEND_URL}/contact"
    payload = {
        "name": "Test User",
        "email": "invalid-email",
        "message": "This is a test message with invalid email format"
    }
    
    try:
        response = requests.post(url, json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 422:
            print_result(True, "Invalid email correctly rejected with 422 validation error")
            return True
        else:
            print_result(False, f"Expected status 422, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_post_contact_short_name():
    """Test POST /api/contact with short name (less than 2 characters)"""
    print_test_header("POST /api/contact - Short Name")
    
    url = f"{BACKEND_URL}/contact"
    payload = {
        "name": "A",
        "email": "test@example.com",
        "message": "This is a test message with a name that is too short"
    }
    
    try:
        response = requests.post(url, json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 422:
            print_result(True, "Short name correctly rejected with 422 validation error")
            return True
        else:
            print_result(False, f"Expected status 422, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_post_contact_short_message():
    """Test POST /api/contact with short message (less than 10 characters)"""
    print_test_header("POST /api/contact - Short Message")
    
    url = f"{BACKEND_URL}/contact"
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "Short"
    }
    
    try:
        response = requests.post(url, json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 422:
            print_result(True, "Short message correctly rejected with 422 validation error")
            return True
        else:
            print_result(False, f"Expected status 422, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def test_get_contact_messages():
    """Test GET /api/contact to retrieve messages"""
    print_test_header("GET /api/contact - Retrieve Messages")
    
    url = f"{BACKEND_URL}/contact"
    
    try:
        response = requests.get(url, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of messages retrieved: {len(data)}")
            
            if len(data) > 0:
                print(f"\nSample message:")
                print(json.dumps(data[0], indent=2, default=str))
                
                # Verify message structure
                required_fields = ["id", "name", "email", "message", "created_at", "status"]
                first_message = data[0]
                missing_fields = [field for field in required_fields if field not in first_message]
                
                if not missing_fields:
                    print_result(True, f"Successfully retrieved {len(data)} messages with correct structure")
                    return True
                else:
                    print_result(False, f"Messages missing required fields: {missing_fields}")
                    return False
            else:
                print_result(True, "Successfully retrieved messages (empty list)")
                return True
        else:
            print_result(False, f"Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
        return False

def run_all_tests():
    """Run all contact form API tests"""
    print("\n" + "="*80)
    print("CONTACT FORM API TEST SUITE")
    print("="*80)
    print(f"Backend URL: {BACKEND_URL}")
    print(f"Test Start Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    results = {
        "total": 0,
        "passed": 0,
        "failed": 0
    }
    
    # Test 1: Valid submission
    results["total"] += 1
    message_id = test_post_contact_valid()
    if message_id:
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Test 2: Invalid email
    results["total"] += 1
    if test_post_contact_invalid_email():
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Test 3: Short name
    results["total"] += 1
    if test_post_contact_short_name():
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Test 4: Short message
    results["total"] += 1
    if test_post_contact_short_message():
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Test 5: Get messages
    results["total"] += 1
    if test_get_contact_messages():
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Print summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    print(f"Total Tests: {results['total']}")
    print(f"Passed: {results['passed']} ✅")
    print(f"Failed: {results['failed']} ❌")
    print(f"Success Rate: {(results['passed']/results['total']*100):.1f}%")
    print("="*80)
    
    return results

if __name__ == "__main__":
    run_all_tests()
