__all__ = [
    'learning',
    'potential',
    'retention',
]
import math
import pandas as pd

from .config import config
from .utilities import parse, get_versions

def learning(data:pd.DataFrame, **kwargs) -> pd.DataFrame:
    data = parse(data, **kwargs)
    versions = get_versions(data)
    results = pd.DataFrame(columns=['version', 'learning'])
    for (idx, version) in enumerate(versions):
        if idx == 0:
            continue
        model_previous_data_current = data[(data['model'] == versions[idx-1]) & (data['dataset'] == version)]['performance'].values[0]
        model_current_data_current = data[(data['model'] == version) & (data['dataset'] == version)]['performance'].values[0]
        results.loc[len(results)] = [version, model_current_data_current - model_previous_data_current]
    return results
    
def potential(data:pd.DataFrame, **kwargs) -> pd.DataFrame:
    data = parse(data, **kwargs)
    versions = get_versions(data)
    results = pd.DataFrame(columns=['version', 'potential'])
    for (idx, version) in enumerate(versions):
        if idx == 0:
            continue
        model_previous_data_current = data[(data['model'] == versions[idx-1]) & (data['dataset'] == version)]['performance'].values[0]
        model_previous_data_previous = data[(data['model'] == versions[idx-1]) & (data['dataset'] == versions[idx-1])]['performance'].values[0]
        results.loc[len(results)] = [version, model_previous_data_previous - model_previous_data_current]
    return results

def retention(data:pd.DataFrame, decay:int|float|None=None, **kwargs) -> pd.DataFrame:
    decay = config.decay if decay is None else decay
    data = parse(data, **kwargs)
    versions = get_versions(data)
    results = pd.DataFrame(columns=['version', 'retention'])
    for (idx, version) in enumerate(versions):
        if idx == 0:
            continue
        # get the appropriate weights for current + all previous versions
        weights = [math.exp(decay*(i-idx)) for i in range(idx+1)] 
        weights = [w/sum(weights) for w in weights]
        avg = 0
        for (v, weight) in zip(versions[:idx+1], weights):
            avg += weight*data[(data['model'] == version) & (data['dataset'] == v)]['performance'].values[0]

        results.loc[len(results)] = [version, avg]

    return results
