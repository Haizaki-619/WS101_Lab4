let reviews = [
  {name:'Jiro Vacunawa', product:'Laptop', rating:5, comment:'The design is very good.'},
  {name:'Allen Cabahug', product:'Phone', rating:4, comment:'Good value for the price.'},
  {name:'Mark Bacolod', product:'Earbuds', rating:5, comment:'Excellent sound quality.'},
  {name:'Jade Atencio', product:'Phone', rating:5, comment:'Amazing camera and design.'},
  {name:'Justin Inovero', product:'Earbuds', rating:3, comment:'Decent but weak bass.'},
  {name:'Ralph Mabini', product:'Earbuds', rating:4, comment:'The sound quality is smooth.'}
];

const r = id => document.getElementById(id);
r("reviews").textContent = JSON.stringify(reviews, null, 2);

function avg_Ratings(){
  let stats={}, out={};
  reviews.forEach(v=>{
    stats[v.product] ??= {sum:0,c:0};
    stats[v.product].sum+=v.rating; stats[v.product].c++;
  });
  for(let p in stats) out[p]=(stats[p].sum/stats[p].c).toFixed(2);
  r("output").textContent=JSON.stringify(out,null,2);
}

function filter_Reviews(){
  const min = parseInt(r("minRating").value) || 0;
  let filtered = reviews.filter(v=>v.rating>=min);
  r("output").textContent=`Reviews with rating ≥ ${min}:\n`+JSON.stringify(filtered,null,2);
}

function highest_Product(){
  let best=null,max=0;
  reviews.forEach(v=>{
    let same = reviews.filter(x=>x.product===v.product);
    let avg = same.reduce((s,x)=>s+x.rating,0)/same.length;
    if(avg>max){max=avg;best=v.product;}
  });
  r("output").textContent=`${best} (Avg ${max.toFixed(2)})`;
}

function groupByProduct(){
  let groups={};
  reviews.forEach(v=>{
    groups[v.product]??=[]; groups[v.product].push(v);
  });
  r("output").textContent=JSON.stringify(groups,null,2);
}

async function fetch_New(){
  r("output").textContent="Fetching...";
  await new Promise(res=>setTimeout(res,1000));
  let newR=[
    {name:'Althea Estores', product:'Laptop', rating:5, comment:'The specs is good for gaming'},
    {name:'Edelbert Gobrin', product:'Phone', rating:3, comment:'Battery life is short.'},
    {name:'Angel Marange', product:'Earbuds', rating:4, comment:'Comfortable for running or taking a walk'}
  ];
  reviews=reviews.concat(newR);
  r("reviews").textContent=JSON.stringify(reviews,null,2);
  r("output").textContent="Added new reviews!";
}
