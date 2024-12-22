def blink(stones):
  newStones = []
  for stone in stones:
    s = str(stone)
    if (stone == 0):
      newStones.append(1)
    elif len(s) % 2 == 0:
      half = int(len(s) / 2)
      newStones.extend([int(s[:half]), int(s[half:])])
    else:
      newStones.append(stone * 2024)
  return newStones

file = open('data.txt')
data = file.read().split(' ')
file.close()

stones = [int(string) for string in data] # list(map(int(data)))

for index in range(75):
  print(index)
  stones = blink(stones)

print(len(stones))
