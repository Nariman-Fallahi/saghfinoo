

def binary_search(alist, target) -> int:
    left = 0
    right = len(alist) -1

    while left <= right:
        mid = (left+right)//2
        if alist[mid] == target:
            return mid
        elif alist[mid] < target:
            left = mid+1
        else:
            right = mid -1

    return -1