let that
class Cart {
	constructor() {
		that = this
		this.addIndex()
		this.init()
	}
	//添加商品数量
	addGoods(e) {
		let num = e.target.parentNode.children[1]
		let price = num.parentNode.previousElementSibling
		let sum = num.parentNode.nextElementSibling
		//计算总数量
	
		num.innerHTML = parseInt(num.textContent) + 1
		sum.innerHTML = Number(price.innerHTML) * Number(num.innerHTML)
		that.render()
		let spans = document.querySelectorAll('span')
		let flog = num.parentNode.parentNode.children[0].firstElementChild.checked
		if (flog) {
			let number = 0
			let total = 0
			that.forCheck(spans, item => {
				number += parseInt(item.innerHTML)
			})
			that.forCheck(that.item, item => {
				total += parseInt(item.innerHTML)
			})

			that.total_number.innerHTML = number
			that.total_rmb.innerHTML = total
		}



	}
	//减少商品数量
	reduceGoods(e) {
		let num = e.target.parentNode.children[1]
		let price = num.parentNode.previousElementSibling
		let sum = num.parentNode.nextElementSibling
		if (parseInt(num.innerHTML) > 0) {

			//计算总数量
			let total_number = document.querySelector('.number')
			//计算总金额
			let total_rmb = document.querySelector('.total')
			num.innerHTML = parseInt(num.textContent) - 1

			sum.innerHTML = Number(price.innerHTML) * Number(num.innerHTML)

			let spans = document.querySelectorAll('span')
			let flog = num.parentNode.parentNode.children[0].firstElementChild.checked
			if (flog) {
				let number = 0
				let total = 0
				that.forCheck(spans, item => {
					number += parseInt(item.innerHTML)
				})
				that.forCheck(that.item, item => {
					total += parseInt(item.innerHTML)
				})

				total_number.innerHTML = number
				total_rmb.innerHTML = total
			}
		}

	}
	init() {
		//获取元素节点
		this.checks = document.querySelectorAll('.check')
		this.header = document.getElementsByClassName('goods')[0]
		this.add = document.querySelectorAll('.add')
		this.reduce = document.querySelectorAll('.reduce')
		this.list = document.querySelector('.list')
		this.add = document.querySelectorAll('.add')
		this.reduce = document.querySelectorAll('.reduce')
		this.item = document.querySelectorAll('.res')
		this.total_number = document.querySelector('.number')
		//计算总金额
		this.total_rmb = document.querySelector('.total')
		//添加商品数量
		this.forCheck(this.add, item => {
			item.onclick = that.addGoods
		})
		//减少商品数量
		this.forCheck(this.reduce, item => {
			item.onclick = that.reduceGoods
		})

		//控制全选按钮
		this.forCheck(that.checks, function (item) {
			item.addEventListener('click', function (e) {


				//记录商品信息
				let lists = this.parentNode.parentNode.children
				let listName = that.header
				that.object = {}
				Array.from(lists).forEach((item, index) => {
					if (index === 0) {
						that.object['is_checked'] = item.children[0].checked

					} else {
						if (index === 3) {
							//num 商品的数量
							let num
							item.innerHTML.trim().replace(/<span>([\s\S])*?<\/span>/ig, (p, p1) => {
								num = p1
							})
							that.object[listName.children[index].innerHTML] = num
						} else {

							that.object[listName.children[index].innerHTML] = item.textContent.trim()
						}


					}
					that.object['key'] = parseInt(this.parentNode.parentNode.getAttribute('index'))

				})
				//更改商品购物车数据
				that.changeGoodInfo(e.target)

			})
		})
		//定义一个map存放用户购买的商品信息
		this.goods = new Set()

	}
	//循环函数封装ele执行函数者
	forCheck(ele, callback) {
		ele.forEach((item, index) => {
			callback(item)
		})
	}
	//给每一个商品添加索引
	addIndex() {
		let goods = document.querySelectorAll('.goods')
		for (let i = 0; i < goods.length; i++) {
			goods[i].setAttribute('index', i + 1)
		}
	}
	empty(e) {
		e.innerHTML = ''
	}
	render() {
		this.empty(that.list)
		// 遍历选中的商品
		that.forCheck(that.goods, (item, index) => {
			let list = document.createElement('li')
			list.innerHTML = item['商品名称']
			that.list.appendChild(list)
		})
	}
	changeGoodInfo(target) {
		let t = target.parentNode.parentNode
		t.children[t.children.length-2].firstElementChild.click()
		t.children[t.children.length-2].lastElementChild.click()
		let size = this.goods.size
		// if (size === 0 ){
		// 	that.goods.add(that.object)
		// 	return 
		// } 
		let is_repeate = Array.from(that.goods).every((item, index) => {
			return item.key !== parseInt(t.getAttribute('index'))
		})
		if (is_repeate) {
			that.goods.add(that.object)
		} else {
			let res = [...that.goods].filter((item, index) => {
				return item.key == t.getAttribute('index')
			})
			that.goods.delete(res[0])
		}
		//渲染数据
		console.log(that.goods)
		that.render()
	}

}
let cart = new Cart()