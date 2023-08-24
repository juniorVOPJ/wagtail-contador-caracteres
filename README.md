# <center>wagtail-charcount</center>


#### A wagtail character and word counting plugin for RichTextFields.

Installing
==========

Install using pip::

    pip install wagtail-charcount

It works with <b>Wagtail 5.0</b> and upwards.

Using
=====
To use this plugin firstly you will need to add ``wagtailcharcount`` to your installed apps.

```python
INSTALLED_APPS = [
    "wagtailcharcount",
]
```

This will add a character and word count next to where your help text would normally appear, this also works fine with help text.


