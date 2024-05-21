#!/usr/bin/python3
"""BasicCache clsss """


BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """ class inhirits Base cache """
    def __init__(self):
        super().__init__()

    def put(self, key, item):
        """ put new data """
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """ get data """
        return self.cache_data.get(key, None)
