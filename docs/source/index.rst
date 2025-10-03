

VIGILANT
========

VIGILANT is a measurement toolkit for performance assessment of adaptive AI.
The three included measurements -- *learning*, *retention*, and *potential* -- help to disentangle performance changes due to model adaptations from those caused by changes in environment.

This toolkit is designed to be used with adaptive AI developed in a sequential modification paradigm. It is expected that there are multiple sequential versions of the AI model, each with a corresponding evaluation dataset.
The input to this tool is the performance of every version of the model, evaluated on every version of the evaluation dataset.
For example, a model with the versions 1, 2, and 3 (each with a corresponding dataset), would have an input in the format:

============= =============== ===========
Model version Dataset version Performance
============= =============== ===========
1              1              0.6
2              1              0.7
3              1              0.3
1              2              0.4
2              2              0.6
3              2              0.8
1              3              0.9
2              3              0.2
3              3              0.9
============= =============== ===========

Getting Started
---------------

VIGILANT can either be utilized as a python package (by cloning the `source repository`_) or `through your browser`_. Instructions and examples for the browser version are provided within the interface.
Both implementations expect your data to be in the structure shown in the example above. 


Python
^^^^^^

Installation
++++++++++++

Clone the `source repository`_, then cd into the cloned directory (``cd VIGILANT/``).
From this directory, the VIGILANT package can be installed using the command: ``pip install "."``.


.. _source repository: https://github.com/DIDSR/VIGILANT
.. _through your browser: /index.html

Minimal example
+++++++++++++++

.. code-block:: python

   import vigilant
   import pandas as pd

   # Direct to the file containing performance data
   data_file = "performance_data.csv"
   
   data = pd.read_csv(data_file)

   """"
   By default, vigilant assumes that model version, dataset version, and performance are
   in columns named "model", "dataset", and "performance", respectively.
   
   This behavior can be changed by adjusting the appropriate keys in the config object.

   The example below indicates that the performance will be found in a column named "AUROC"
   """"

   vigilant.config.performance_key = 'AUROC'

   # Calculate individual measurements
   L = vigilant.learning(data)
   P = vigilant.potential(data)
   R = vigilant.retention(data)

The output of each of the measurement functions is a two column dataframe (`version` and the name of the measurement).

Contents
--------

.. toctree::
   :maxdepth: 2

   vigilant

