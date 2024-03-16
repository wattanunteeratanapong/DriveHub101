class Reservation:
    def __init__(self,user,car,amount,start_date,end_date,location):
        self.__user = user
        self.__car = car
        self.__amount = amount
        self.__start_date = start_date
        self.__end_date = end_date
        self.__location = location
    @property
    def user(self):
        return self.__user
    @property
    def car(self):
        return self.__car
    @property
    def amount(self):
        return self.__amount
    @property
    def start_date(self):
        return self.__start_date
    @property
    def end_date(self):
        return self.__end_date
    @property
    def location(self):
        return self.__location