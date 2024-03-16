class Review:
    def __init__(self, user,license, rating, comments):
        self.__user = user
        self.__license = license
        self.__rating = rating
        self.__comments = comments

    @property
    def user(self):
        return self.__user

    @property
    def license(self):
        return self.__license

    @property
    def rating(self):
        return self.__rating

    @property
    def comments(self):
        return self.__comments