
def convert_dunderline_to_underline_in_dict_keys(d: dict):
    """convert __ to _"""

    for key in d.keys():
        d[key.replace("__", "_")] = d.pop(key)

    return d

