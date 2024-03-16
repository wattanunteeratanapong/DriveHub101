from fastapi import FastAPI, Request , HTTPException,Header,Response,File, UploadFile, Query
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse,JSONResponse
from fastapi import Form
from fastapi.middleware.cors import CORSMiddleware
from datetime import date,timedelta
import shutil
import os
import uvicorn
from car_detail import Car_detail
from websitecontroller import WebsiteController
from reservation import Reservation
from fastapi.staticfiles import StaticFiles

from post_model import *

app = FastAPI()
UPLOAD_DIRECTORY = "uploads"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)
origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
)
templates = Jinja2Templates(directory="Frontend")

site = WebsiteController()

site.init_car_list()

@app.get('/')
def index(request: Request):
    return RedirectResponse(url="/docs")

@app.post('/login', tags=["Auth"])
async def login(login_data: LoginModel):
    email: str = login_data.email
    password: str = login_data.password
    log = site.login(email, password)
    if log == "Incorrect Password":
        raise HTTPException(status_code=201, detail="Incorrect Password")
    elif log == "Email not found":
        raise HTTPException(status_code=202, detail="Email not found")
    return {"status": "Login Successful","name": site.find_user_with_email(email).user.name,"token": site.find_user_with_email(email).token, "role": site.find_user_with_email(email).user.role}

@app.post('/register', tags=["Auth"])
async def register(register_data: RegisterModel):
    email: str = register_data.email
    name: str = register_data.name
    phone_Number: str = register_data.phone_Number
    password: str = register_data.password
    role: str = register_data.role

    log = site.register(email, name, phone_Number, password, role)
    if log == "Registration Successful":
        return {"status": "Registration Successful","token": site.find_user_with_email(email).token}
        
    elif log == "User already exists":
        raise HTTPException(status_code=401, detail="User already exists")
    
    elif log == "Invalid Role":
        raise HTTPException(status_code=402, detail="Invalid Role")
    
    return {"status": "Registration Successful"}

@app.get("/api/customer", tags=["API"])
def get_all_customer():
    return {"Customers": {index: str(obj) for index, obj in enumerate(site.customer_list)}}

@app.get("/api/lender", tags=["API"])
def get_all_lender():
    return {"Lenders": {index: str(obj) for index, obj in enumerate(site.lender_list)}}

##
@app.get("/add_coupon", tags = ["Coupons"])
async def add_coupon(serial:str = Query(...),discount:str = Query(...)):
    coupon = site.create_coupon(serial,discount)
    return {coupon.serial : coupon.discount}

@app.get("/remove_coupon", tags = ["Coupons"])
async def remove_coupon(serial:str = Query(...)):
    result = site.remove_coupon(serial)
    if result == "Success":
        return "Success"
    else:
        return "Error"
    
@app.get("/get_discount", tags = ["Coupons"])
async def get_discount(serial:str = Query(...)):
    temp = site.check_coupon_discount(serial)
    return temp

@app.post("/make_review", tags=["Reviews"])
async def make_review(review_data: ReviewData):
    return site.create_review(review_data.token, review_data.license, review_data.rating, review_data.comments)

@app.get("/get_review_of_license", tags=["Reviews"])
async def get_review_of_license(license:str = Query(...)):
    return site.get_review_of_license(license)

@app.post("/remove_review", tags=["Reviews"])
async def remove_review(license:str = Query(...)):
    return site.remove_review_of_license(license)

@app.get("/checkout_page", tags=["Customer"])
async def checkout_info(token: str = Query(...), license: str = Query(...)):
    user_detail = site.user_detail_from_token(token)
    car_name = site.find_car_name_by_license(license)
    location = site.find_car_location_by_license(license)
    price = site.find_car_price_by_license(license)
    response_body = {
        "user_details": user_detail,
        "car_name": car_name,
        "location": location,
        "price": price
    }
    
    return response_body



@app.get("/api/car", tags = ["API"])
def get_all_car():
    return {"Cars": {index: {"Car License": obj.license, "Price": obj.price, "Status" : obj.status} for index, obj in enumerate(site.car_list)}}

@app.get("/api/carunavail", tags = ["API"])
def carunavail():
    return {"Cars": {index: {"Date": obj.unavailable_dates, "License": obj.license} for index, obj in enumerate(site.car_list)}}

@app.get("/search/car/{license}", tags=["Anyone"])
async def get_car_details(license: str):
    for cars in site.car_list:
        if cars.license == license:
            detail = cars.car_detail
            return {"car_detail": [
                {
                    "name":detail.name,
                    "model":detail.model,
                    "car_type":detail.carType,
                    "seats":detail.seats,
                    "license_plate":cars.license,
                    "fuel_system":detail.fuelSystem,
                    "doors":detail.doors,
                    "transmission":detail.transmission,
                    "delivery_area":cars.location,
                    "seat_type":detail.seatType,
                    "engine_capacity":detail.engineCapacity,
                    "price":detail.price,
                    "owner": cars.owner
                }
            ]}

    raise HTTPException(status_code=404, detail="Car not found")

@app.post("/make_reservation", tags=["Customer"])
async def make_reservation(data: ReservationConfirmation):
  
    check_token = site.find_user_with_token(str(data.token))
    if check_token is None:
        raise HTTPException(status_code=402, detail="Token not found")
    
    token = data.token
    license = data.license
    start_date = data.start_date
    end_date = data.end_date
    location = site.find_car_location_by_license(license)
    site.add_reservation(token,license,start_date,end_date,location)
    return {"message": data}

@app.get("/get_reservation", tags=["Customer"])
def get_reservation_of_customer(token: str = Query(...)):
    check_token = site.find_user_with_token(token)
    if check_token is None:
        raise HTTPException(status_code=402, detail="Token not found")
    reservations = site.find_reservation_of_token(token)
    return {"reservations": reservations}

@app.get("/get_all_reservations", tags=["API"])
def get_all_reservations():
    return {"Reservations" : {index: {"License":obj.car,"Location" : obj.location,"Start Date":obj.start_date,"End Date":obj.end_date} for index, obj in enumerate(site.reservation_list)}}


@app.post("/search_car", tags=["Customer"])
async def search_car(find_car_data: FindCarModel):
    location: str = find_car_data.location
    pickupdate: str = find_car_data.pickupdate
    returndate: str = find_car_data.returndate

    temp = site.check_available_car(location,pickupdate,returndate)
    return {"car": [
            {
                "Name": car.car_detail.name,
                "Model": car.car_detail.model,
                "price": car.price,
                "license" : car.license
            }
            for car in temp
        ]}

@app.post("/lender/my_car", tags=["Lender"])
async def my_car_post(tokens: TokenModel):
    token: str = tokens.token
    role = site.find_user_with_token(str(token))
    if role is None:
        raise HTTPException(status_code=402, detail="Token not found")

    if role.role == "lender":
        lender_temp = site.find_lender(role.email)
        return {"car": [
            {
                "Name": car.car_detail.name,
                "Model": car.car_detail.model,
                "License": car.license,
            }
            for car in lender_temp.lent_cars
        ]}
    return {"Error": "You are not a lender"}

@app.post("/lender/add_car", tags = ["Lender"])
async def add_car(add_car: token_and_car_model):
    name: str = add_car.name
    model: str = add_car.model
    licensePlate: str = add_car.licensePlate
    deliveryArea: str = add_car.deliveryArea
    price: str = add_car.price
    carType: str = add_car.carType
    transmission: str = add_car.transmission
    seat: str = add_car.seat
    seatType: str = add_car.seatType
    fuelSystem: str = add_car.fuelSystem
    engineCapacity: str = add_car.engineCapacity
    door: str = add_car.door

    temp = site.add_car(name, model, licensePlate, deliveryArea, price, carType, transmission, seat, seatType, fuelSystem, engineCapacity, door,add_car.token)
    if temp == "You are not a lender":
        raise HTTPException(status_code=401, detail="You are not a lender")
    elif temp == "Token not found":
        raise HTTPException(status_code=402, detail="Token not found")
    return {"status": "Car Added Successfully"}

@app.post("/lender/edit/{license}", tags = ["Lender"])
async def edit_car(edit_data: token_and_car_model):
    name: str = edit_data.name
    model: str = edit_data.model
    licensePlate: str = edit_data.licensePlate
    deliveryArea: str = edit_data.deliveryArea
    price: str = edit_data.price
    carType: str = edit_data.carType
    transmission : str = edit_data.transmission
    seat: str = edit_data.seat
    seatType: str = edit_data.seatType
    fuelSystem: str = edit_data.fuelSystem
    engineCapacity: str = edit_data.engineCapacity
    door: str = edit_data.door
    token: str = edit_data.token

    temp = site.edit_car(name, model, licensePlate, deliveryArea, price, carType, transmission, seat, seatType, fuelSystem, engineCapacity, door, token)

    if temp == "You are not a lender":
        raise HTTPException(status_code=401, detail="You are not a lender")
    elif temp == "Token not found":
        raise HTTPException(status_code=402, detail="Token not found")
    elif temp == "Car not found":
        raise HTTPException(status_code=403, detail="Car not found")
    elif temp == "You are not the owner of the car":
        raise HTTPException(status_code=404, detail="You are not the owner of the car")
    elif temp == "Car Edited Successfully":
        return {"status": "Car Edited Successfully"}


@app.get("/get_car_unavailable_dates", tags = ["Lender"])
async def get_car_unavailable_dates_post(license:str):
    for cars in site.car_list:
        if cars.license == license:
            return {"Car Unavailable Dates" : {index: {"DAY" : obj.day, "MONTH": obj.month, "YEAR": obj.year} for index, obj in enumerate(cars.unavailable_dates)}}
    return {"Error"}

@app.get("/user", tags=["API"])
async def get_all_user():
    data = []
    for user in site.user_list:
        data.append({"email": user.email, "Name": user.name, "Phone_Number": user.phone_number, "Password": user.password, "Contact_info": user.contact_info, "Role": user.role , "Token": site.find_user_with_email(user.email).token})
    return data

@app.post("/get_user_token", tags=["API"])
async def get_user(request: Request, token:TokenModel):
    token_input:str = token.token
    temp = site.find_user_with_token(str(token_input))
    if temp is None:
        raise HTTPException(status_code=402,detail="token not found")
    return {"name":temp.name ,"plone_number":temp.phone_number,"role": temp.role}

@app.post("/Car_list/init", tags=["API"])
async def init_car_list(request: Request):
    site.init_car_list()
    return {"status":"Car list initialized"}
    
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host    = "127.0.0.1",
        port    = 8000, 
        reload  = True
    )