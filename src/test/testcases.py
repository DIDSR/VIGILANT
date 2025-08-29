import json
import pandas as pd
from pathlib import Path
import unittest
import sys
sys.path.append(str(Path(__file__).joinpath('../..').resolve()))
import vigilant

def load_test_cases(dir:Path) -> list[dict]:
    testcases = []
    for file in dir.iterdir():
        if file.suffix == '.json':
            with file.open() as f:
                data = json.load(f)
            data = data if isinstance(data, list) else [data]
            testcases += data
    return testcases

class TestCase(unittest.TestCase):
    sourceDir = Path(__file__).joinpath('../../../tests').resolve()
    functions = ['learning', 'potential', 'retention'] # TODO

    def test(self):
        self.cases = load_test_cases(self.sourceDir)
        for case in self.cases:
            inp = pd.DataFrame(case['input'])
            exp = case['output']
            for f in self.functions:
                func = vigilant.__dict__[f]
                out = func(inp).to_dict(orient='records')
                for item in out:
                    e = [x for x in exp if x['version'] == item['version']]
                    self.assertEqual(len(e), 1)
                    e = e[0]
                    for key in item:
                        self.assertAlmostEqual(item[key], e[key], places=4)


if __name__ == '__main__':
    unittest.main()
