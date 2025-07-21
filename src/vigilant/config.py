__all__ = [
    "Configuration",
    "config",
]

class Configuration(object):
    default = dict(
        dataset_key='dataset',
        model_key='model',
        performance_key='performance',
        decay=0.5, # TODO: determine appropriate default
    )
    def __init__(self, **kwargs):
        self.__dict__['values'] = {**self.__class__.default}
        
    def __getattr__(self, key):
        if key in self.values:
            return self.values[key]
        else:
            raise AttributeError(f"{self.__class__.__name__} doesn't have an attribute \"{key}\"")
    
    def __setattr__(self, key, value):
        if key in self.values:
            self.values[key] = value
        else:
            raise AttributeError(f"{self.__class__.__name__} doesn't have an attribute \"{key}\"")
    
    def __repr__(self):
        values = ", ".join([f"{k}={v}" for (k,v) in self.values.items()])
        return f"{self.__class__.__name__}({values})"
    
config = Configuration() # global instance

