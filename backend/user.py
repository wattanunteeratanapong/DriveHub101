from car import Car
class User:

    def __init__(self, email, name, phone_number, password):
        self.__email = email
        self.__name = name
        self.__phone_number = phone_number
        self.__password = password
        self.__contact_info = None
        self.__role = None

    @property
    def email(self):
        return self.__email

    @property
    def name(self):
        return self.__name
    
    @property
    def phone_number(self):
        return self.__phone_number
    @property
    def password(self):
        return self.__password
    @property
    def contact_info(self):
        return self.__contact_info
    
    @property
    def role(self):
        return self.__role
    
    @role.setter
    def role(self,role):
        self.__role = role
    
    @property
    
    def create_customer(self):
        pass

    def create_lender(self):
        pass

    def review(self):
        pass

    def check_existing_user(self):
        pass

    def check_user(self):
        pass

class Customer(User):
    def __init__(self,id,name,phone_number,password):
        super().__init__(id,name,phone_number,password)
        self.__reservations = []

    @property
    def reservations(self):
        return self.__reservations
    
    def add_reservation(self, reservation):
        self.reservations.append(reservation)

class Lender(User):
    def __init__(self,id,name,phone_number,password):
        super().__init__(id,name,phone_number,password)

        self.__lent_cars = []
    
    @property
    def lent_cars(self):
        return self.__lent_cars
    
    def lend_car(self,car_obj):
        # temp = Car(status,license,self,location,price)
        self.lent_cars.append(car_obj)

    def find_lent_car(self,license):
        for car in self.lent_cars:
            if car.license == license:
                return car
        return None

    def update_car_status(self,updated_status,car_instance):
        if (self == car_instance.owner):
            if updated_status == 0:
                car_instance.change_status("NOT AVAILABLE")
            elif updated_status == 1:
                car_instance.change_status("AVAILABLE")

