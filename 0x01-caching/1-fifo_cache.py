#!/usr/bin/python3
"""FIFOCache clsss """


BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """ class inhirits Base cache """
    def __init__(self):
        super().__init__()
        self.__keys = []

    def put(self, key, item):
        """ put new data """
        if key is None or item is None:
            return
        self.cache_data[key] = item
        self.__keys.append(key)
        if len(self.cache_data) > self.MAX_ITEMS:
            remove = self.__keys[0]
            del self.cache_data[remove]
            print(f"DISCARD: {remove}")
            self.__keys.remove(remove)

    def get(self, key):
        """ get data """
        return self.cache_data.get(key, None)
