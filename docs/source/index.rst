

VIGILANT
========

VIGILANT is a measurement toolkit for performance assessment of adaptive AI systems.
The three included measurements -- *learning*, *rentention*, and *potential* -- help to disentangle performance changes due to model adaptations from those caused by shifts in the evaluation environment.

Getting Started
---------------

VIGILANT can either be utilized as a python package (by cloning the `source repository`_) or `through your browser`_. Instructions and examples for the browser version are provided within the interface.

.. raw:: html

   <p class="customFormat">
   This toolkit is designed to be used with adaptive AI developed in a sequential modification paradigm. It is expected that there are multiple sequential versions of the AI model, each with a corresponding evaluation dataset.
   The input to this tool is the performance of every version of the model, evaluated on every version of the evaluation dataset.
   For example, a model with the versions 
   <span version="1">1</span>, <span version="2">2</span>, and <span version="3">3</span> (each with a corresponding dataset), would have an input in the format:
   </p>
   
.. raw:: html
 
   <table class="exampleData docutils align-default">
      <thead>
         <tr>
            <th>Model version</th>
            <th>Dataset version</th>
            <th>Performance</th>
         </tr>
      </thead>
      <tbody>
         <tr>
            <td version="1">1</td>
            <td version="1">1</td>
            <td>0.6</td>
         </tr>
         <tr>
            <td version="2">2</td>
            <td version="1">1</td>
            <td>0.7</td>
         </tr>
         <tr>
            <td version="3">3</td>
            <td version="1">1</td>
            <td>0.3</td>
         </tr>
         <tr>
            <td version="1">1</td>
            <td version="2">2</td>
            <td>0.4</td>
         </tr>
         <tr>
            <td version="2">2</td>
            <td version="2">2</td>
            <td>0.6</td>
         </tr>
         <tr>
            <td version="3">3</td>
            <td version="2">2</td>
            <td>0.8</td>
         </tr>
         <tr>
            <td version="1">1</td>
            <td version="3">3</td>
            <td>0.9</td>
         </tr>
         <tr>
            <td version="2">2</td>
            <td version="3">3</td>
            <td>0.2</td>
         </tr>
         <tr>
            <td version="3">3</td>
            <td version="3">3</td>
            <td>0.9</td>
         </tr>
      </tbody>
   </table>





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

