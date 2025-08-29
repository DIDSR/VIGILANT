__all__ = [
    'learning',
    'potential',
    'retention',
]
import math
import pandas as pd

from .config import config
from .utilities import clean, get_versions

def learning(data:pd.DataFrame, **kwargs) -> pd.DataFrame:
    """ Measures the model's learning with respect to each version.

    Args:
        data: performance data with indicated dataset and model versions.
        **kwargs: optional additional arguments passed to :func:`clean`.

    Returns:
        A pandas DataFrame containing the calculated learning for each indicated version.
    """
    data = clean(data, **kwargs)
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
    """ Measures the model's potential learning with respect to each version.

    Args:
        data: performance data with indicated dataset and model versions.
        **kwargs: optional additional arguments passed to :func:`clean`.

    Returns:
        A pandas DataFrame containing the calculated potential for each indicated version.
    """
    data = clean(data, **kwargs)
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
    """ Measures the model's knowledge retention with respect to each version.

    Args:
        data: performance data with indicated dataset and model versions.
        decay: exponential decay term for calculating the weighted average.
        **kwargs: optional additional arguments passed to :func:`clean`.

    Returns:
        A pandas DataFrame containing the calculated retention for each indicated version.
    """
    decay = config.decay if decay is None else decay
    data = clean(data, **kwargs)
    versions = get_versions(data)
    results = pd.DataFrame(columns=['version', 'retention'])
    for (idx, version) in enumerate(versions):
        if idx == 0:
            continue
        # get the appropriate weights for all previous versions
        weights = [math.exp(decay*(i-(idx-1))) for i in range(idx)] 
        weights = [w/sum(weights) for w in weights]
        avg = 0
        for (v, weight) in zip(versions[:idx], weights):
            avg += weight*data[(data['model'] == version) & (data['dataset'] == v)]['performance'].values[0]

        results.loc[len(results)] = [version, avg]

    return results
