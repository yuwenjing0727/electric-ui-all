export default {
	getItemsByDicKey(key,s,t){
		let self = this;
		t.$http.get(`${process.env.NODE_ENV}/admin/dict/selectall/${key}`)
			.then((response) => {
				if(response.data.code == 0){
					t[s] =  response.data.data;
					console.log(t[s]);
				}
			})
			.catch(function(error) {
				console.log(error);
			});

	}
}
