def flow(user,actual,inp):
	print(user, actual, inp)
	def val(x):return x[1]
	def make(s): return list(map(lambda y:[y.split(':')[0],float(y.split(':')[1])],sorted(s.split(',')[:-1])))
	def tot(x):return sum(map(val,x))
	def fxn(x,y,i):
		#if len(x)!=len(y):return "inv len"
		#w=list(map(val,x+y))
		#print(list(w),any(z<0 for z in w))
		#print(list(w))
		#print(list(w), [z==0 for z in w],all(z==0 for z in w))
		#print(list(w))
		#if any(x<0 for x in w) or all(x==0 for x in w):return "inv cons"
		switch={
			"0":[[z[0],tot(x)/len(x)] for z in x],
			"1":y,# if tot(x)==tot(y) else "inv total",
			"2":[[z[0],z[1]*tot(x)/tot(y)] for z in y], #if tot(y)==100.00 else "inv %",
			"3":[[z[0],z[1]*tot(x)/tot(y)] for z in y]
			}
		return switch.get(i,"inv mode")
	stuser=make(user)
	stactx=make(actual)
	stact=fxn(stuser,stactx,inp)
	'''err={
		"inv mode":" error mode wrng",	
		"inv %":" error !=100",
		"inv total":" error total!=total",
		"inv len":" error len uneq",
		"inv cons":" error invalid constraints"
	}
	check=err.get(str(stact),"pass")
	if check!="pass":
		return check'''
	l,out=[[stuser[i][0],float('%.2f'%(stuser[i][1]-stact[i][1]))] for i in range(len(stuser))],[]
	while True:
		l=sorted(filter(lambda x:abs(x[1])>=0.01,l),key=val)
		if not l:break
		maxD,maxC=-l[0][1],l[-1][1]
		D,C=l[0][0],l[-1][0]
		trans=min(maxD,maxC)
		boolD,boolC=trans==maxD,trans==maxC
		if boolD and boolC:
			del l[0]
			del l[-1]
		elif boolD:
			l[-1][1]-=maxD
			del l[0]
		else:
			l[0][1]+=maxC
			del l[-1]
		out+=[{"paid_by":D,"paid_to":C,"amount":trans}]
	return out

#print(flow("newbass:111,newbazz:0,", "newbazz:55.5,newbass:55.5,", "1"))
