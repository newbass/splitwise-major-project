import string,random
from random import randint 
def gene():
	N=randint(32,128)
	x = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(N))
	print(x)
	return x
	
