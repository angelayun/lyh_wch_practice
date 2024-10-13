class Solution:
    def search(self, nums: List[int], target: int) -> int:
        def is_blue(i: int) -> bool:
            x = nums[i]
            if x > nums[-1]:
                return target > nums[-1] and x >= target
            return target > nums[-1] or x >= target

        left, right = -1, len(nums) - 1  # 开区间 (-1, n-1)
        while left + 1 < right:  # 开区间不为空
            mid = (left + right) // 2
            if is_blue(mid):
                right = mid
            else:
                left = mid
        return right if nums[right] == target else -1