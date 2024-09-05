
PERSIAN_CHARS = sorted(list("ابتپجچحخدذآرزژسشصضطظعغفقکگلمنوهی") + list("نه‌د")) 

ENGLISH_CHARS = sorted(list("abcdefghijklmnopqrstuvwxyz"))

PERSIAN_SIGNS = sorted(list("،؟.!:؛\""))

ENGLISH_SIGNS = sorted(list("!.,?':;\""))

ENGLISH_NUMBERS = sorted(list("1234567890"))

PERSIAN_NUMBERS = sorted(list("۰۱۲۳۴۵۶۷۸۹"))

NAME_CHARS = sorted(PERSIAN_CHARS + ENGLISH_CHARS + list(" "))
USERNAME_CHARS = sorted(ENGLISH_CHARS + ENGLISH_NUMBERS + list("_.-"))
DESCRIPTION_CHARS = sorted(list(" ") + ENGLISH_CHARS + PERSIAN_CHARS + ENGLISH_NUMBERS + PERSIAN_NUMBERS + ENGLISH_SIGNS + PERSIAN_SIGNS+ ['\n'])



if len(PERSIAN_CHARS) != 32:
    print(f"ERROR: invalid length of PERSIAN_CHARS: {len(PERSIAN_CHARS)}")

if len(ENGLISH_CHARS) != 26:
    print(f"ERROR: invalid length of ENGLISH_CHARS: {len(ENGLISH_CHARS)}")


# for tests
NAME_INVALID_CHARS = list('!@#$%^&*()-=+_[]{}\\|\'";:.,></?')+ENGLISH_NUMBERS+PERSIAN_NUMBERS
USERNAME_INVALID_CHARS = list('@!#$%^&*(){}[]\\|\'":;?/><.,')
DESCRIPTION_INVALID_CHARS = list('<>{}[]\\|')
NUMBER_INVALID_CHARS = PERSIAN_CHARS + ENGLISH_CHARS + PERSIAN_SIGNS + ENGLISH_SIGNS + list('{}[]\\|-_()=+/?')