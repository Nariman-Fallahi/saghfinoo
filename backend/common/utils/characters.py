
PERSIAN_CHARS = " ابتپجچحخدذآرزژسشصضطظعغفقکگلمنوهی"

if len(PERSIAN_CHARS) != 32+1:
    print(f"ERROR: invalid length of PERSIAN_CHARS: {len(PERSIAN_CHARS)}")

ENGLISH_CHARS = " abcdefghijklmnopqrstuvwxyz"

if len(ENGLISH_CHARS) != 26+1:
    print(f"ERROR: invalid length of ENGLISH_CHARS: {len(ENGLISH_CHARS)}")

PERSIAN_SIGNS = "،؟.!:؛\""

ENGLISH_SIGNS = "!.,?':;\""