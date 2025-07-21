__all__ = [
    "parse",
]
import pandas as pd
from typing import Literal
from .config import config

def parse(data:pd.DataFrame, dataset_key:str|None=None, model_key:str|None=None, performance_key=None):
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
    df = clean(df)
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

def clean(data:pd.DataFrame, verbose:bool=True) -> pd.DataFrame:
    all_versions = list(set(data['dataset'].unique().tolist() + data['model'].unique().tolist()))
    missing_model_versions = [v for v in all_versions if v not in data['model'].unique()]
    missing_dataset_versions = [v for v in all_versions if v not in data['dataset'].unique()]
    incomplete = missing_model_versions + missing_dataset_versions
    data = data[(~data['dataset'].isin(incomplete)) & (~data['model'].isin(incomplete))].copy()
    # TODO: verbose option -> print if there are options missing
    # TODO: make sure that there are no duplicate combinations of model and dataset version
    return data
    
