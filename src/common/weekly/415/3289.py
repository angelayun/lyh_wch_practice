class Solution:
    def getSneakyNumbers(self, nums: List[int]) -> List[int]:
        n = len(nums) - 2
        xor_all = n ^ (n + 1)  # n 和 n+1 多异或了
        for i, x in enumerate(nums):
            xor_all ^= i ^ x
        shift = xor_all.bit_length() - 1

        ans = [0, 0]
        for i, x in enumerate(nums):
            if i < n:
                ans[i >> shift & 1] ^= i
            ans[x >> shift & 1] ^= x
        return ans



class Solution:
    def getSneakyNumbers(self, nums: List[int]) -> List[int]:
        n = len(nums) - 2
        a = -n * (n - 1) // 2
        b = -n * (n - 1) * (n * 2 - 1) // 6
        for x in nums:
            a += x
            b += x * x
        x = int((a - sqrt(b * 2 - a * a)) / 2)
        return [x, a - x]
