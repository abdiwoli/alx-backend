#!/usr/bin/python3
"""FIFOCache clsss """
from collections import OrderedDict


BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """ class inhirits Base cache """

    def __init__(self):
        super().__init__()
        self.cache_data = OrderedDict()
        self.__most_recent = None

    def put(self, key, item):
        """Add new data to the cache"""
        if key is None or item is None:
            return

        if key in self.cache_data:
            del self.cache_data[key]
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            remove = next(reversed(self.cache_data))
            del self.cache_data[remove]
            print(f"DISCARD: {remove}")

        self.cache_data[key] = item

    def get(self, key):
        """Get data from the cache"""
        if key in self.cache_data:
            value = self.cache_data.pop(key)
            self.cache_data[key] = value
            return value
        return None
