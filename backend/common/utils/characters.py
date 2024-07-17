
PERSIAN_CHARS = sorted("ابتپجچحخدذآرزژسشصضطظعغفقکگلمنوهی")

ENGLISH_CHARS = sorted("abcdefghijklmnopqrstuvwxyz")

PERSIAN_SIGNS = sorted("،؟.!:؛\"")

ENGLISH_SIGNS = sorted("!.,?':;\"")

ENGLISH_NUMBERS = sorted("1234567890")

PERSIAN_NUMBERS = sorted("")

NAME_CHARS = sorted(PERSIAN_CHARS + ENGLISH_CHARS + " ")
USERNAME_CHARS = sorted(ENGLISH_CHARS + ENGLISH_NUMBERS + "_.-")
DESCRIPTION_CHARS = sorted(" " + ENGLISH_CHARS + PERSIAN_CHARS + ENGLISH_NUMBERS + PERSIAN_NUMBERS + ENGLISH_SIGNS + PERSIAN_SIGNS)



if len(PERSIAN_CHARS) != 32:
    print(f"ERROR: invalid length of PERSIAN_CHARS: {len(PERSIAN_CHARS)}")

if len(ENGLISH_CHARS) != 26:
    print(f"ERROR: invalid length of ENGLISH_CHARS: {len(ENGLISH_CHARS)}")