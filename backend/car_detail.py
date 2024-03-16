class Car_detail:
    def __init__(self, name, model, price, carType,seats, fuelSystem, doors, transmission, seatType, engineCapacity):
        self.name = name
        self.model = model
        self.price = price
        self.carType = carType
        self.review = None
        self.seats = seats
        self.fuelSystem = fuelSystem
        self.doors = doors
        self.transmission = transmission
        self.seatType = seatType
        self.engineCapacity = engineCapacity

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, value):
        self.__name = value

    @property
    def model(self):
        return self.__model

    @model.setter
    def model(self, value):
        self.__model = value

    @property
    def price(self):
        return self.__price

    @price.setter
    def price(self, value):
        self.__price = value

    @property
    def owner(self):
        return self.__owner

    @owner.setter
    def owner(self, value):
        self.__owner = value

    @property
    def review(self):
        return self.__review

    @review.setter
    def review(self, value):
        self.__review = value

    @property
    def seats(self):
        return self.__seats

    @seats.setter
    def seats(self, value):
        self.__seats = value

    @property
    def fuelSystem(self):
        return self.__fuelSystem

    @fuelSystem.setter
    def fuelSystem(self, value):
        self.__fuelSystem = value

    @property
    def doors(self):
        return self.__doors

    @doors.setter
    def doors(self, value):
        self.__doors = value

    @property
    def transmission(self):
        return self.__transmission

    @transmission.setter
    def transmission(self, value):
        self.__transmission = value

    @property
    def seatType(self):
        return self.__seatType

    @seatType.setter
    def seatType(self, value):
        self.__seatType = value

    @property
    def engineCapacity(self):
        return self.__engineCapacity

    @engineCapacity.setter
    def engineCapacity(self, value):
        self.__engineCapacity = value

