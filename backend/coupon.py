class Coupon:
    def __init__(self,serial,discount):
        self.__serial = serial
        self.__discount = discount
    
    @property
    def serial(self):
        return self.__serial
    @property
    def discount(self):
        return self.__discount