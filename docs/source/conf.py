from pathlib import Path
import sys
sys.path.insert(0, str(Path('..','src')))

# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'VIGILANT'
copyright = '2025, Alexis Burgon and Ravi Samala'
author = 'Alexis Burgon and Ravi Samala'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [ "sphinx.ext.autosectionlabel", 'sphinx.ext.napoleon']

templates_path = ['_templates']
exclude_patterns = []



# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'alabaster'
html_static_path = ['_static']
html_css_files = ["remove-footer.css"]
html_theme_options = {
    'github_user':'DIDSR',
    'github_repo':'VIGILANT',
    'github_button': True,
    'font_family': 'sans-serif',
}
