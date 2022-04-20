from itertools import product
import time
from main import redis, Order


key = 'refund_order'
group = 'payment-group'

try:
    redis.xgroup_create(key, group)
except Exception:
    print('Group already exists!')


while True:
    try:
        results = redis.xreadgroup(group, key, {key: '>'}, None)

        if results != []:
            for result in results:
                obj = result[1][0][1]
                order = Order.get(obj['pk'])
                order.status = 'refunded'
                order.save()
            print(results)

    except Exception as e:
        print(e)
    time.sleep(1)
