from DMY import DMY
from car_detail import Car_detail

class Car:
    def __init__(self,status,car_detail,license,owner,location,price):
        self.__status = status
        self.__car_detail:Car_detail = car_detail
        self.__license = license
        self.__owner = owner
        self.__location = location
        self.__price = price
        self.__unavailable_dates = []

    def reserve_date(self,day,month,year):
        self.unavailable_dates.append(DMY(int(day),int(month),int(year)))
    
    def change_status(self,new_status):
        self.__status = new_status

    @property
    def status(self):
        return self.__status
    
    @status.setter
    def status(self, new_status):
        self.__status = new_status
    
    @property
    def car_detail(self):
        return self.__car_detail
    
    @car_detail.setter
    def car_detail(self, new_car_detail):
        self.__car_detail = new_car_detail

    @property
    def license(self):
        return self.__license
    
    @license.setter
    def license(self, new_license):
        self.__license = new_license
    
    @property
    def owner(self):
        return self.__owner
    
    @owner.setter
    def owner(self, new_owner):
        self.__owner = new_owner

    @property
    def location(self):
        return self.__location
    
    @location.setter
    def location(self, new_location):
        self.__location = new_location
    
    @property
    def price(self):
        return self.__price
    
    @price.setter
    def price(self, new_price):
        self.__price = new_price
    
    @property
    def unavailable_dates(self):
        return self.__unavailable_dates
    
    
    def edit_car(self, name, model, licensePlate, deliveryArea, price, carType, transmission, seats, seatType, fuelSystem, engineCapacity, doors):
        self.license = licensePlate
        self.location = deliveryArea
        self.price = price
        self.car_detail.name = name
        self.car_detail.model = model
        self.car_detail.price = price
        self.car_detail.carType = carType
        self.car_detail.seats = seats
        self.car_detail.fuelSystem = fuelSystem
        self.car_detail.doors = doors
        self.car_detail.transmission = transmission
        self.car_detail.seatType = seatType
        self.car_detail.engineCapacity = engineCapacity
        return "Car Edited Successfully"


