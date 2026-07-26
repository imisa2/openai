(function(){
'use strict';
var allNames=['Plain Flour','Cake Flour','Almond Flour','Rolled Oats','Cornflour','Caster Sugar','Brown Sugar','Icing Sugar','Honey','Maple Syrup','Butter','Fresh Milk','Double Cream','Greek Yoghurt','Cream Cheese','Eggs','Vanilla','Cocoa Powder','Dark Chocolate','White Chocolate','Milk Chocolate','Chocolate Chips','Strawberries','Raspberries','Blueberries','Lemon','Orange','Banana','Apple','Cherries','Pineapple','Mango','Coconut','Almonds','Hazelnuts','Pistachios','Walnuts','Pecans','Carrots','Pumpkin Puree','Beetroot','Espresso','Cinnamon','Nutmeg','Ginger','Cardamom','Rose Water','Mint','Sea Salt','Baking Powder','Baking Soda','Red Colour','Blue Colour','Yellow Colour','Rainbow Sprinkles','Marshmallows','Caramel','Berry Jam','Vanilla Custard','Biscuit Crumbs'];
allNames.sort(function(a,b){return b.length-a.length});
var recipes=[
{name:'Vanilla Dream',label:'Vanilla Dream Cake',shape:'classic',ings:['Cake Flour','Caster Sugar','Butter','Eggs','Fresh Milk','Vanilla','Baking Powder']},
{name:'Chocolate Lava Crown',label:'Chocolate Lava Crown',shape:'lava',ings:['Plain Flour','Brown Sugar','Butter','Eggs','Cocoa Powder','Dark Chocolate','Double Cream']},
{name:'Strawberry Cloud',label:'Strawberry Cloud Cake',shape:'heart',ings:['Cake Flour','Caster Sugar','Eggs','Double Cream','Strawberries','Vanilla','Icing Sugar']},
{name:'Royal Red Velvet',label:'Royal Red Velvet',shape:'square',ings:['Plain Flour','Caster Sugar','Butter','Eggs','Cocoa Powder','Red Colour','Cream Cheese']},
{name:'Lemon Sunshine',label:'Lemon Sunshine Cake',shape:'bundt',ings:['Plain Flour','Caster Sugar','Butter','Eggs','Lemon','Greek Yoghurt','Icing Sugar']},
{name:'Carrot Crown',label:'Carrot Crown Cake',shape:'rustic',ings:['Plain Flour','Brown Sugar','Eggs','Carrots','Cinnamon','Walnuts','Cream Cheese']},
{name:'Blueberry Moon',label:'Blueberry Moon Cake',shape:'dome',ings:['Almond Flour','Caster Sugar','Eggs','Blueberries','Lemon','Double Cream','Blue Colour']},
{name:'Coconut Snow Palace',label:'Coconut Snow Palace',shape:'palace',ings:['Cake Flour','Caster Sugar','Eggs','Coconut','White Chocolate','Double Cream','Vanilla']},
{name:'Pistachio Rose Garden',label:'Pistachio Rose Garden',shape:'hex',ings:['Almond Flour','Caster Sugar','Eggs','Pistachios','Rose Water','Cardamom','Double Cream']},
{name:'Rainbow Celebration Tower',label:'Rainbow Celebration Tower',shape:'tower',ings:['Cake Flour','Caster Sugar','Butter','Eggs','Red Colour','Blue Colour','Yellow Colour','Rainbow Sprinkles']}
];
var sweetSet=['Caster Sugar','Brown Sugar','Icing Sugar','Honey','Maple Syrup','Dark Chocolate','White Chocolate','Milk Chocolate','Chocolate Chips','Caramel','Berry Jam','Vanilla Custard','Rainbow Sprinkles','Marshmallows','Biscuit Crumbs'];
function same(a,b){return a.length===b.length&&a.every(function(x){return b.indexOf(x)>-1})}
function selected(){return Array.prototype.slice.call(document.querySelectorAll('.ing.on')).map(function(btn){var t=btn.textContent||'';return allNames.find(function(n){return t.indexOf(n)>-1})}).filter(Boolean)}
function currentRecipe(){var t=(document.getElementById('orderName')||{}).textContent||'';return recipes.find(function(r){return t.indexOf(r.name)>-1||t.indexOf(r.label)>-1})||recipes[0]}
function toast(msg){var old=document.querySelector('.guide-toast');if(old)old.remove();var n=document.createElement('div');n.className='guide-toast';n.textContent=msg;document.body.appendChild(n);setTimeout(function(){if(n.parentNode)n.remove()},4700)}
function guide(){
 var customer=document.querySelector('.customer'),order=document.querySelector('.order');
 if(!customer||!order)return null;
 var box=document.getElementById('recipeGuide');
 if(!box){box=document.createElement('section');box.id='recipeGuide';box.className='recipe-guide';box.innerHTML='<div class="recipe-guide-head"><span>🧾 On-screen Recipe</span><span class="recipe-progress" id="recipeProgress">0 selected</span></div><div class="recipe-list" id="recipeListLive"></div><div class="recipe-status" id="recipeStatusLive"></div>';order.insertAdjacentElement('afterend',box)}
 return box;
}
function findButton(name){return Array.prototype.slice.call(document.querySelectorAll('.ing')).find(function(btn){return (btn.textContent||'').indexOf(name)>-1})}
function renderGuide(){
 if(!guide())return;
 var r=currentRecipe(),sel=selected(),missing=r.ings.filter(function(x){return sel.indexOf(x)<0}),extra=sel.filter(function(x){return r.ings.indexOf(x)<0});
 var list=document.getElementById('recipeListLive'),progress=document.getElementById('recipeProgress'),status=document.getElementById('recipeStatusLive');
 list.innerHTML=r.ings.map(function(name){var done=sel.indexOf(name)>-1;return '<button type="button" class="recipe-chip '+(done?'done':'')+'" data-name="'+name.replace(/"/g,'&quot;')+'"><span>'+(done?'✓':'○')+'</span><span>'+name+'</span></button>'}).join('');
 progress.textContent=(r.ings.length-missing.length)+' / '+r.ings.length+' selected';progress.classList.toggle('ready',missing.length===0&&extra.length===0);
 status.classList.remove('ready');
 if(missing.length===0&&extra.length===0){status.textContent='Recipe complete. Press Bake in Oven.';status.classList.add('ready')}
 else if(extra.length){status.textContent='Remove: '+extra.join(', ')+'. Still needed: '+missing.join(', ')+'.'}
 else{status.textContent=missing.length===1?'Next ingredient: '+missing[0]+'.':'Still needed: '+missing.join(', ')+'.'}
 Array.prototype.slice.call(document.querySelectorAll('.ing')).forEach(function(btn){var name=allNames.find(function(n){return (btn.textContent||'').indexOf(n)>-1});btn.classList.toggle('recipe-needed',r.ings.indexOf(name)>-1&&sel.indexOf(name)<0)});
 Array.prototype.slice.call(list.querySelectorAll('.recipe-chip')).forEach(function(chip){chip.addEventListener('click',function(){var b=findButton(chip.dataset.name);if(b){b.scrollIntoView({behavior:'smooth',block:'center'});b.animate([{transform:'scale(1)'},{transform:'scale(1.1)'},{transform:'scale(1)'}],{duration:600})}})});
}
function nearest(sel){return recipes.map(function(r){var missing=r.ings.filter(function(x){return sel.indexOf(x)<0}),extra=sel.filter(function(x){return r.ings.indexOf(x)<0});return{r:r,missing:missing,extra:extra,cost:missing.length+extra.length*1.25}}).sort(function(a,b){return a.cost-b.cost})[0]}
function applyShape(shape){var cake=document.getElementById('cake');if(!cake)return;Array.prototype.slice.call(cake.classList).forEach(function(c){if(c.indexOf('shape-')===0)cake.classList.remove(c)});cake.classList.add('shape-'+shape);Array.prototype.slice.call(cake.querySelectorAll('.layer')).forEach(function(x){x.style.display=''})}
function install(){
 guide();renderGuide();
 var orderName=document.getElementById('orderName');if(orderName)new MutationObserver(function(){setTimeout(renderGuide,0)}).observe(orderName,{childList:true,characterData:true,subtree:true});
 document.addEventListener('click',function(e){if(e.target.closest('.ing')||e.target.closest('#clear')||e.target.closest('#serve'))setTimeout(renderGuide,30)},true);
 var pantry=document.getElementById('pantry');if(pantry)new MutationObserver(function(m){if(m.some(function(x){return x.type==='childList'}))setTimeout(renderGuide,20)}).observe(pantry,{childList:true,subtree:true});
 var bake=document.getElementById('bake');if(bake)bake.addEventListener('click',function(ev){
   var sel=selected(),match=recipes.find(function(r){return same(sel,r.ings)}),special=null;
   if(same(sel,sweetSet))special={shape:'fusion',label:'Ultimate Sweetness Fusion'};
   if(same(sel,allNames))special={shape:'mythic',label:'Everything Everywhere Cake'};
   var valid=match||special;
   if(!valid){ev.preventDefault();ev.stopImmediatePropagation();var near=nearest(sel),parts=['Incomplete recipe. No cake was baked.','Closest recipe: '+near.r.label+'.'];if(near.missing.length)parts.push('Add '+near.missing.slice(0,4).join(', ')+(near.missing.length>4?' and more':'')+'.');if(near.extra.length)parts.push('Remove '+near.extra.slice(0,3).join(', ')+(near.extra.length>3?' and more':'')+'.');var d=document.getElementById('display');if(d)d.textContent='INCOMPLETE';var s=document.getElementById('serve');if(s)s.disabled=true;toast(parts.join(' '));renderGuide();return false}
   setTimeout(function(){applyShape((match||special).shape)},3250);
 },true);
 var sub=document.querySelector('.panel .head .sub');if(sub)sub.textContent='No time limit. Follow the on-screen recipe and select every ingredient.';
 var pantrySub=document.querySelector('.ingredients .sub');if(pantrySub)pantrySub.textContent='60 ingredients. Complete recipes only; yellow cards are needed for the order.';
 var challenge=document.getElementById('challenge');if(challenge)challenge.textContent='⭐ The recipe guide checks ingredients as you select them. Incomplete mixtures stay unbaked.';
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();