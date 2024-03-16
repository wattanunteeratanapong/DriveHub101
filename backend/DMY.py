class DMY:
    def __init__(self,day,month,year):
        self.__day = day
        self.__month = month
        self.__year = year

    @property
    def day(self):
        return self.__day
    @property
    def month(self):
        return self.__month
    @property
    def year(self):
        return self.__year