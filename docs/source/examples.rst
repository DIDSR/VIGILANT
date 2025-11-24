Example
=======

1. Loading input data
---------------------

.. TODO: have the input data details start open
.. dropdown:: Input data
   
    .. raw:: html

        <table class="docutils align-default">
            <tr>
                <td><a href="../../example-data/example-data.csv" download="example_VIGILANT_data.csv">Download (csv)</a></td>
                <td><a href="../../example-data/example-data.json" download="example_VIGILANT_data.json">Download (json)</a></td>
            </tr>
        </table>

        <table class="exampleData docutils align-default">
            <thead>
                <th>model</th>
                <th>dataset</th>
                <th>performance</th>
                <th>repetition</th>
            </thead>
            <tbody>
            <tr>
                <td version="1">1</td>
                <td version="1">1</td>
                <td>0.80</td>
                <td version="1">1</td>
            </tr>
            <tr>
                <td version="1">1</td>
                <td version="2">2</td>
                <td>0.76</td>
                <td version="1">1</td>
            </tr>
            <tr>
                <td version="1">1</td>
                <td version="3">3</td>
                <td>0.50</td>
                <td version="1">1</td>
            </tr>
            <tr>
                <td version="1">1</td>
                <td version="4">4</td>
                <td>0.45</td>
                <td version="1">1</td>
            </tr>
            <tr>
                <td version="2">2</td>
                <td version="1">1</td>
                <td>0.81</td>
                <td version="1">1</td>
            </tr>
            <tr>
                <td version="2">2</td>
                <td version="2">2</td>
                <td>0.83</td>
                <td version="1">1</td>
            </tr>
            <tr>
                <td version="2">2</td>
                <td version="3">3</td>
                <td>0.55</td>
                <td version="1">1</td>
            </tr>
            <tr>
                <td version="2">2</td>
                <td version="4">4</td>
                <td>0.50</td>
                <td version="1">1</td>
            </tr>
            <tr>
                <td version="3">3</td>
                <td version="1">1</td>
                <td>0.56</td>
                <td version="1">1</td>
            </tr>
            <tr>
                <td version="3">3</td>
                <td version="2">2</td>
                <td>0.60</td>
                <td version="1">1</td>
            </tr>
            <tr>
                <td version="3">3</td>
                <td version="3">3</td>
                <td>0.80</td>
                <td version="1">1</td>
            </tr>
            <tr>
                <td version="3">3</td>
                <td version="4">4</td>
                <td>0.75</td>
                <td version="1">1</td>
            </tr>
            <tr>
                <td version="4">4</td>
                <td version="1">1</td>
                <td>0.10</td>
                <td version="1">1</td>
            </tr>
            <tr>
                <td version="4">4</td>
                <td version="2">2</td>
                <td>0.20</td>
                <td version="1">1</td>
            </tr>
            <tr>
                <td version="4">4</td>
                <td version="3">3</td>
                <td>0.10</td>
                <td version="1">1</td>
            </tr>
            <tr>
                <td version="4">4</td>
                <td version="4">4</td>
                <td>0.85</td>
                <td version="1">1</td>
            </tr>
            <tr>
                <td version="1">1</td>
                <td version="1">1</td>
                <td>0.75</td>
                <td version="2">2</td>
            </tr>
            <tr>
                <td version="1">1</td>
                <td version="2">2</td>
                <td>0.78</td>
                <td version="2">2</td>
            </tr>
            <tr>
                <td version="1">1</td>
                <td version="3">3</td>
                <td>0.53</td>
                <td version="2">2</td>
            </tr>
            <tr>
                <td version="1">1</td>
                <td version="4">4</td>
                <td>0.47</td>
                <td version="2">2</td>
            </tr>
            <tr>
                <td version="2">2</td>
                <td version="1">1</td>
                <td>0.89</td>
                <td version="2">2</td>
            </tr>
            <tr>
                <td version="2">2</td>
                <td version="2">2</td>
                <td>0.82</td>
                <td version="2">2</td>
            </tr>
            <tr>
                <td version="2">2</td>
                <td version="3">3</td>
                <td>0.57</td>
                <td version="2">2</td>
            </tr>
            <tr>
                <td version="2">2</td>
                <td version="4">4</td>
                <td>0.54</td>
                <td version="2">2</td>
            </tr>
            <tr>
                <td version="3">3</td>
                <td version="1">1</td>
                <td>0.52</td>
                <td version="2">2</td>
            </tr>
            <tr>
                <td version="3">3</td>
                <td version="2">2</td>
                <td>0.64</td>
                <td version="2">2</td>
            </tr>
            <tr>
                <td version="3">3</td>
                <td version="3">3</td>
                <td>0.81</td>
                <td version="2">2</td>
            </tr>
            <tr>
                <td version="3">3</td>
                <td version="4">4</td>
                <td>0.73</td>
                <td version="2">2</td>
            </tr>
            <tr>
                <td version="4">4</td>
                <td version="1">1</td>
                <td>0.12</td>
                <td version="2">2</td>
            </tr>
            <tr>
                <td version="4">4</td>
                <td version="2">2</td>
                <td>0.21</td>
                <td version="2">2</td>
            </tr>
            <tr>
                <td version="4">4</td>
                <td version="3">3</td>
                <td>0.14</td>
                <td version="2">2</td>
            </tr>
            <tr>
                <td version="4">4</td>
                <td version="4">4</td>
                <td>0.82</td>
                <td version="2">2</td>
            </tr>
            <tr>
                <td version="1">1</td>
                <td version="1">1</td>
                <td>0.85</td>
                <td version="3">3</td>
            </tr>
            <tr>
                <td version="1">1</td>
                <td version="2">2</td>
                <td>0.72</td>
                <td version="3">3</td>
            </tr>
            <tr>
                <td version="1">1</td>
                <td version="3">3</td>
                <td>0.56</td>
                <td version="3">3</td>
            </tr>
            <tr>
                <td version="1">1</td>
                <td version="4">4</td>
                <td>0.41</td>
                <td version="3">3</td>
            </tr>
            <tr>
                <td version="2">2</td>
                <td version="1">1</td>
                <td>0.89</td>
                <td version="3">3</td>
            </tr>
            <tr>
                <td version="2">2</td>
                <td version="2">2</td>
                <td>0.83</td>
                <td version="3">3</td>
            </tr>
            <tr>
                <td version="2">2</td>
                <td version="3">3</td>
                <td>0.52</td>
                <td version="3">3</td>
            </tr>
            <tr>
                <td version="2">2</td>
                <td version="4">4</td>
                <td>0.51</td>
                <td version="3">3</td>
            </tr>
            <tr>
                <td version="3">3</td>
                <td version="1">1</td>
                <td>0.54</td>
                <td version="3">3</td>
            </tr>
            <tr>
                <td version="3">3</td>
                <td version="2">2</td>
                <td>0.61</td>
                <td version="3">3</td>
            </tr>
            <tr>
                <td version="3">3</td>
                <td version="3">3</td>
                <td>0.87</td>
                <td version="3">3</td>
            </tr>
            <tr>
                <td version="3">3</td>
                <td version="4">4</td>
                <td>0.71</td>
                <td version="3">3</td>
            </tr>
            <tr>
                <td version="4">4</td>
                <td version="1">1</td>
                <td>0.12</td>
                <td version="3">3</td>
            </tr>
            <tr>
                <td version="4">4</td>
                <td version="2">2</td>
                <td>0.25</td>
                <td version="3">3</td>
            </tr>
            <tr>
                <td version="4">4</td>
                <td version="3">3</td>
                <td>0.11</td>
                <td version="3">3</td>
            </tr>
            <tr>
                <td version="4">4</td>
                <td version="4">4</td>
                <td>0.82</td>
                <td version="3">3</td>
            </tr>
            </tbody>
        </table>


.. tab-set::
    :sync-group: example

    .. tab-item:: Python
        :sync: python

        .. code-block:: python

            import pandas as pd
            import vigilant

            # Load data from csv
            data = pd.read_csv('example_VIGILANT_data.csv')
            # or load data from json
            data = pd.read_json('example_VIGILANT_data.json')

            # Assign column names as needed
            vigilant.config.model_key = 'model'
            vigilant.config.dataset_key = 'dataset'
            vigilant.config.performance_key = 'performance'

    .. tab-item:: Browser
        :sync: browser

        .. button-link:: https://didsr.github.io/VIGILANT/examples.html?ex=0
            :expand:
            :color: primary
            :outline:

            View this example in the VIGILANT interface

        From the VIGILANT interface home page, select the option "Upload your own data".

        .. image:: ../static/example-screenshots/1-homepage.png
            :width: 80%
            :align: center

        Then, either drag your input file to the indicated area, or click **choose a file** to browse your local files

        .. image:: ../static/example-screenshots/2-upload.png
            :width: 80%
            :align: center

        Use the dropdowns to select the appropriate columns for each of the required pieces of information, then hit **submit**

        .. image:: ../static/example-screenshots/3-configuration.png
            :width: 80%
            :align: center

2. VIGILANT measurements
------------------------

.. tab-set:: 
    :sync-group: example

    .. tab-item:: Python
        :sync: python

        .. code-block:: python

            from functools import reduce, partial

            # Iterate over different repetitions
            results = []
            for (repetition, df) in data.groupby('repetition'):
                print(repetition)
                # Run all three measurements & merge into a single DataFrame
                repetition_results = reduce(
                    partial(pd.merge, on="version"),
                    [
                        vigilant.learning(df),
                        vigilant.potential(df),
                        vigilant.retention(df),
                    ]
                )
                # re-assign the repetition value
                repetition_results['repetition'] = repetition
                
                results.append(repetition_results)

            # merge all repetition results into a single DataFrame & display
            results = pd.concat(results, ignore_index=True) 
            print(results)

        
        Which should give the output:

        .. code-block:: console

               version  learning  potential  retention  repetition
            0      2.0      0.07       0.04   0.810000           1
            1      3.0      0.25       0.28   0.584898           1
            2      4.0      0.10       0.05   0.130720           1
            3      2.0      0.04      -0.03   0.890000           2
            4      3.0      0.24       0.25   0.594695           2
            5      4.0      0.09       0.08   0.157777           2
            6      2.0      0.11       0.13   0.890000           3
            7      3.0      0.35       0.31   0.583572           3
            8      4.0      0.11       0.16   0.154871           3



 
    .. tab-item:: Browser 
        :sync: browser 

        The VIGILANT measurements will be shown as both a plot (left) and table (right)

        .. image:: ../static/example-screenshots/4-output.png
            :width: 80%
            :align: center

        Select the :octicon:`download` **download** button to save your results.
        
        .. image:: ../static/example-screenshots/5-download.png
            :width: 80%
            :align: center