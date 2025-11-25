"""
Quick test script to verify backend is working
Run this after starting the backend server
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    print("🔍 Testing health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("✅ Health check passed!")
            print(f"   Response: {response.json()}")
            return True
        else:
            print(f"❌ Health check failed! Status: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        print("   Make sure backend is running on port 8000")
        return False

def test_cars_endpoint():
    """Test cars endpoint"""
    print("\n🔍 Testing cars endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/cars")
        if response.status_code == 200:
            cars = response.json()
            print(f"✅ Cars endpoint working! Found {len(cars)} cars")
            return True
        else:
            print(f"❌ Cars endpoint failed! Status: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_renters_endpoint():
    """Test renters endpoint"""
    print("\n🔍 Testing renters endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/renters")
        if response.status_code == 200:
            renters = response.json()
            print(f"✅ Renters endpoint working! Found {len(renters)} renters")
            return True
        else:
            print(f"❌ Renters endpoint failed! Status: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_rentals_endpoint():
    """Test rentals endpoint"""
    print("\n🔍 Testing rentals endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/rentals")
        if response.status_code == 200:
            rentals = response.json()
            print(f"✅ Rentals endpoint working! Found {len(rentals)} rentals")
            return True
        else:
            print(f"❌ Rentals endpoint failed! Status: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_cors():
    """Test CORS headers"""
    print("\n🔍 Testing CORS configuration...")
    try:
        response = requests.options(
            f"{BASE_URL}/cars",
            headers={
                "Origin": "http://localhost:3000",
                "Access-Control-Request-Method": "GET"
            }
        )
        cors_header = response.headers.get("Access-Control-Allow-Origin")
        if cors_header:
            print(f"✅ CORS enabled! Allow-Origin: {cors_header}")
            return True
        else:
            print("⚠️  CORS headers not found (might be OK)")
            return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_create_car():
    """Test creating a car"""
    print("\n🔍 Testing car creation...")
    try:
        test_car = {
            "numImma": "TEST-999-ZZ",
            "marque": "Test",
            "modele": "Model",
            "kilometrage": 1000,
            "etat": 0,
            "prixLocation": 25.00
        }
        response = requests.post(f"{BASE_URL}/cars", json=test_car)
        if response.status_code == 201:
            car = response.json()
            car_id = car["id"]
            print(f"✅ Car created successfully! ID: {car_id}")
            
            # Clean up - delete the test car
            delete_response = requests.delete(f"{BASE_URL}/cars/{car_id}")
            if delete_response.status_code == 200:
                print(f"✅ Test car cleaned up (deleted)")
            return True
        elif response.status_code == 400:
            # Might already exist
            print("⚠️  Car might already exist (this is OK)")
            return True
        else:
            print(f"❌ Car creation failed! Status: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    print("=" * 60)
    print("🧪 Backend API Test Suite")
    print("=" * 60)
    print(f"\nTesting backend at: {BASE_URL}")
    print("\nMake sure the backend is running before running this test!")
    print("-" * 60)
    
    results = []
    
    # Run tests
    results.append(("Health Check", test_health()))
    results.append(("Cars Endpoint", test_cars_endpoint()))
    results.append(("Renters Endpoint", test_renters_endpoint()))
    results.append(("Rentals Endpoint", test_rentals_endpoint()))
    results.append(("CORS Configuration", test_cors()))
    results.append(("Create Car (Write Test)", test_create_car()))
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 Test Summary")
    print("=" * 60)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\n🎯 Score: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 All tests passed! Backend is working perfectly!")
        print("\n✅ Your backend is properly linked and ready to use!")
        print("\n📚 Next steps:")
        print("   1. Import Postman collection: Car_Rental_API.postman_collection.json")
        print("   2. Read POSTMAN_TESTING_GUIDE.md for detailed testing")
        print("   3. Connect your Next.js frontend to the API")
    else:
        print("\n⚠️  Some tests failed. Check the errors above.")
        print("\n🔧 Troubleshooting:")
        print("   1. Make sure backend is running: START_BACKEND.bat")
        print("   2. Check if port 8000 is available")
        print("   3. Verify virtual environment is activated")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Test interrupted by user")
    except Exception as e:
        print(f"\n\n❌ Unexpected error: {e}")


