__all__ = [
    "clean",
    "get_versions",
    "version",
]
import pandas as pd
from .config import config

def clean(data:pd.DataFrame,dataset_key:str|None=None, model_key:str|None=None, performance_key=None, verbose:bool=True) -> pd.DataFrame:
    """ Cleans data to only contain versions with both dataset and model information.

    Args:
        data: performance data with indicated dataset and model versions.
        dataset_key: Column containing dataset version information; if None, uses the value in :class:`Configuration`.
        model_key: Column containing model version information; if None, uses the value in :class:`Configuration`.
        performance_key: Column containing model performance; if None, uses the value in :class:`Configuration`.
    
    Returns:
        The cleaned data.
    """
    dataset_key = config.dataset_key if dataset_key is None else dataset_key
    model_key = config.model_key if model_key is None else model_key
    performance_key = config.performance_key if performance_key is None else performance_key
    assert dataset_key in data # TODO: improved error handling
    assert model_key in data
    assert performance_key in data
    df = data.copy()
    df.rename(columns={
        dataset_key:'dataset',
        model_key:'model',
        performance_key:'performance',
    }, inplace=True)

    all_versions = list(set(df['dataset'].unique().tolist() + df['model'].unique().tolist()))
    missing_model_versions = [v for v in all_versions if v not in df['model'].unique()]
    missing_dataset_versions = [v for v in all_versions if v not in df['dataset'].unique()]
    incomplete = missing_model_versions + missing_dataset_versions
    df = df[(~df['dataset'].isin(incomplete)) & (~df['model'].isin(incomplete))].copy()
    # TODO: verbose option -> print if there are options missing
    # TODO: make sure that there are no duplicate combinations of model and dataset version
    return df

def get_versions(data:pd.DataFrame) -> list: # TODO: make sure that sorting works properly
    # TODO: we need to map this back to the original versions
    versions = list(map(version, list(set(data['dataset'].unique().tolist() + data['model'].unique().tolist()))))
    versions.sort()
    return versions

def version(value:str|int|float):
    if isinstance(value, str):
        value = tuple(map(int, version.split(".")))
    return value


    
