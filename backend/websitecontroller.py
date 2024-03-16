from user import User,Customer,Lender
from car import Car
from car_detail import Car_detail
from DMY import DMY
from datetime import date,timedelta
from uuid import uuid4
from reservation import Reservation
from coupon import Coupon
from review import Review
rand_token = uuid4()

class Token:
    def __init__(self,user,token):
        self.__User: User = user
        self.__token: str = token

    @property
    def token(self):
        return self.__token
    
    @property
    def user(self):
        return self.__User
    
class WebsiteController:
    def __init__(self):

        self.__user_list = []
        self.__customer_list = []
        self.__lender_list = []
        self.__reservation_list = []
        self.__car_list = []
        self.__token_list = []
        self.__coupon_list = []
        self.__review_list = []

    @property 
    def review_list(self):
        return self.__review_list
    @property
    def coupon_list(self):
        return self.__coupon_list
    @property
    def user_list(self):
        return self.__user_list
    @property
    def customer_list(self):
        return self.__customer_list
    @property
    def lender_list(self):
        return self.__lender_list
    @property
    def reservation_list(self):
        return self.__reservation_list
    @property
    def car_list(self):
        return self.__car_list
    
    @property
    def token_list(self):   
        return self.__token_list
    
    def create_review(self,token,license,rating,comments):
        user = self.find_user_with_token(token)
        review = Review(user.name,license,rating,comments)
        self.review_list.append(review)
        return {
            "review": {
                "name": review.user,
                "car": review.license,
                "rating": review.rating,
                "comments":review.comments
            }
        }
    
    def get_review_of_license(self,license):
        temp = []
        for review in self.review_list:
            if review.license == license:
                temp.append(review)
        return {"Reviews" : {index: {"Reviewer": obj.user,"Stars" : obj.rating,"Comments":obj.comments} for index, obj in enumerate(temp)}}
    
    def remove_review_of_license(self,license):
        for review in self.review_list:
            if review.license == license:
                self.review_list.remove(review)

    def create_coupon(self,serial,discount):
        coupon = Coupon(serial,discount)
        self.coupon_list.append(coupon)
        return coupon
    
    def remove_coupon(self,serial):
        for coupon in self.coupon_list:
            if coupon.serial == serial:
                self.coupon_list.remove(coupon)
                return "Success"
    
    def find_coupon(self,serial):
        found = 0
        for coupon in self.coupon_list:
            if coupon.serial == serial:
                found = 1
                break
        if found == 0:
            return None
        else:
            return coupon
        
    def check_coupon_discount(self,serial):
        temp = self.find_coupon(serial)
        if  temp != None:
            return temp.discount
        else:
            return 0

    # def check_token(self,token):
    #     for tokens in self.token_list:
    #         if tokens.token == token:
    #             return tokens.user.role

    def register(self, email, Name, Phone_Number, Password, Role):

        for user in self.user_list:
            if user.email == email:
                return "User already exists"
            
        token = uuid4()
        # user = User(email, Name, Phone_Number, Password, Role,token)
        if (Role == "customer"):

            customer = Customer(email, Name, Phone_Number, Password)
            user = User(email, Name, Phone_Number, Password)
            user.role = "customer"
            token_data = Token(user,token)
            self.customer_list.append(customer)
            self.token_list.append(token_data)
            self.user_list.append(user)

        elif (Role == "lender"):
            lender = Lender(email, Name, Phone_Number, Password)
            user = User(email, Name, Phone_Number, Password)
            user.role = "lender"

            token_data = Token(user,token)
            self.token_list.append(token_data)
            self.lender_list.append(lender)
            self.user_list.append(user)
        else:
            return "Invalid Role"
        
        return "Registration Successful"
        
        pass
    def login(self, email, password):
        for user in self.user_list:
            if user.email == email and user.password == password:
                return user
            elif user.email == email and user.password != password:
                return "Incorrect Password"
        return "Email not found"

    def find_user_with_token(self,token) -> User:
        for tokens in self.token_list:
            if str(tokens.token) == str(token):
                return tokens.user
        
    def user_detail_from_token(self, token):
        user = self.find_user_with_token(token)
        return {
            "user_details": {
                "name": user.name,
                "email": user.email,
                "phone_number": user.phone_number
            }
        }

    
    def find_user_with_email(self,email):

        for token in self.__token_list:
            if token.user.email == email:
                return token
        return None
    
    def find_lender(self,email):
        for lender in self.lender_list:
            if lender.email == email:
                return lender
        return None
    
    def find_car(self,license):
        for car in self.car_list:
            if car.license == license:
                return car
        return None
    
    def add_car(self,name, model, licensePlate, deliveryArea, price, carType, transmission, seats, seatType, fuelSystem, engineCapacity, doors, token):

        user = self.find_user_with_token(str(token))

        if user is None:
            return "Token not found"
        elif user.role != "lender":
            return "User is not a lender"
        
        temp = self.find_lender(user.email)
        data_car = Car_detail( name, model, price,carType,seats, fuelSystem, doors, transmission, seatType, engineCapacity)
        car = Car("AVAILABLE",data_car,licensePlate,user.name,deliveryArea,price)

        temp.lend_car(car)
        self.car_list.append(car)
        return "Car Added Successfully"
        


    def edit_car(self,name, model, licensePlate, deliveryArea, price, carType, transmission, seats, seatType, fuelSystem, engineCapacity, doors, token):
        user = self.find_user_with_token(str(token))

        if user is None:
            return "Token not found"
        elif user.role != "lender":
            return "User is not a lender"
        
        car = self.find_car(licensePlate)
        if car is None:
            return "Car not found"
        elif car.owner != user.name:
            return "You are not the owner of the car"
        else:
            lender = self.find_lender(user.email)
            car.edit_car(name, model, licensePlate, deliveryArea, price, carType, transmission, seats, seatType, fuelSystem, engineCapacity, doors)
            lender.find_lent_car(licensePlate).edit_car(name, model, licensePlate, deliveryArea, price, carType, transmission, seats, seatType, fuelSystem, engineCapacity, doors)
            return "Car Edited Successfully"
        
    def check_available_car(self, location, start_date, end_date):
        available_car = []
        temp = start_date.split("/")
        start = DMY(int(temp[0]), int(temp[1]), int(temp[2]))
        temp = end_date.split("/")
        end = DMY(int(temp[0]), int(temp[1]), int(temp[2]))
        for car in self.car_list:
            if car.location == location:
                if car.status == "AVAILABLE":
                    unavailable = False  # Reset unavailable for each car
                    for date in car.unavailable_dates:
                        if date.year == start.year and date.month == start.month:
                            if date.day >= start.day and date.day <= end.day:
                                unavailable = True
                                break
                    if not unavailable:
                        available_car.append(car)
        return available_car
    def find_car_location_by_license(self,license):
        car = self.find_car_with_license(license)
        return car.location
    def find_car_name_by_license(self,license):
        car = self.find_car_with_license(license)
        return car.car_detail.name
    def find_car_price_by_license(self,license):
        car = self.find_car_with_license(license)
        return car.price
            
    def init_car_list(self):
        self.create_coupon("TEST100",100)
        customer = Customer("oat@a","oat","0967459032","1234")
        user = User("oat@a","oat","0967459032","1234")
        user.role = "customer"
        token = "1"
        token_data = Token(user,token)
        self.customer_list.append(customer)
        self.token_list.append(token_data)
        self.user_list.append(user)

        lender = Lender("tee@a","tee","0967459032","1234")
        user = User("tee@a","tee","0967459032","1234")
        user.role = "lender"
        token = "2"
        token_data = Token(user,token)
        self.token_list.append(token_data)
        self.lender_list.append(lender)
        self.user_list.append(user)

        owner = self.find_user_with_email("tee@a")
        lender = self.find_lender("tee@a")


        car = Car_detail("Toyota","Camry", 100,"Sedan",4,"Petrol",4,"Automatic","Leather",2000)
        car_detail2 = Car_detail("Honda", "Accord", 120, "Sedan", 4, "Petrol", 4, "Automatic", "Cloth", 1800)
        car_detail3 = Car_detail("Nissan", "Altima", 110, "Sedan", 4, "Petrol", 4, "Automatic", "Cloth", 2000)
        car1 = Car("AVAILABLE",car,"ABC123",owner.user.name,"ECC",100)
        car2 = Car("AVAILABLE", car_detail2, "DEF456", owner.user.name, "ECC", 150)
        car3 = Car("AVAILABLE", car_detail3, "GHI789", owner.user.name, "ECC", 120)
        car3.reserve_date(5,3,2024)

        self.car_list.append(car1)
        lender.lend_car(car1)
        self.car_list.append(car2)
        lender.lend_car(car2)
        self.car_list.append(car3)
        lender.lend_car(car3)

    def find_car_with_license(self,license):
        for cars in self.car_list:
            if license == cars.license:
                return cars
            
    def find_reservation_of_token(self,token):
        temp = []
        user = self.find_user_with_token(token)
    
        if user is None:
            return "Token not found"
    
        for customer in self.customer_list:
            if user.name == customer.name:
                break
        
        for reservation in self.reservation_list:
            if reservation.user.email == customer.email:
                temp.append(reservation)

        return {"Reservations" : {index: {"License":obj.car,"Amount": obj.amount,"Location" : obj.location,"Start Date":obj.start_date,"End Date":obj.end_date} for index, obj in enumerate(temp)}}
    
    def add_reservation(self,token,license,start_date,end_date,location):

        user = self.find_user_with_token(token)
    
        if user is None:
            return "Token not found"
    
        for customer in self.customer_list:
            if user.name == customer.name:
                break
        else:
            return "Customer not found"
    
        car = self.find_car_with_license(license)
    
        if car is None:
           return "Car not found"
        
        car = self.find_car_with_license(license)
        temp = start_date.split("/")
        date1 = date(int(float(temp[2])),int(temp[1]),int(temp[0]))
        temp = end_date.split("/")
        date2 = date(int(float(temp[2])),int(temp[1]),int(temp[0]))
        delta = date2-date1
        for i in range(delta.days + 1):
            a = date1 + timedelta(days=i)
            b = str(a)
            splitted = b.split("-")
            r_date = DMY(int(splitted[2]),int(splitted[1]),int(splitted[0]))
            car.unavailable_dates.append(r_date)
        reserve = Reservation(customer,car.license,car.price,start_date,end_date,location)
        self.reservation_list.append(reserve)
        customer.add_reservation(reserve)
        return reserve
        
