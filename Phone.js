function createTag(element,elementClass="",elementID=""){
    var tag = document.createElement(element);
    if(elementClass !== "")
        tag.setAttribute("class",elementClass);    
    if(elementID !== "")
    tag.setAttribute("id",elementID);
    return tag;
}

async function call(){
    var num = document.getElementById("number").value;
    if(num){
        //console.log("success");
        //var phonenum = "";
        phonenum=num;
        //console.log(phonenum);
        try{
            var res = await fetch(`https://api.veriphone.io/v2/verify?phone=${phonenum}&key=AC936E0777824BE49B1407051DCEF729`);
            var data = await res.json();
            //console.log(data);
            var col = document.getElementById("status");
            col.innerHTML="";
            var card = createTag("div","card h-100");
            if(data.phone_valid){
                
                var phonereg="Data unavailable";
                var phonetype="Data unavailable";
                if(data.phone_region)
                phonereg=data.phone_region;
                if(data.phone_type)
                phonetype=data.phone_type;
                card.setAttribute("style","box-shadow: 0.5rem 0.5rem rgb(99, 253, 137); padding:20px;");
                var cardtitle = createTag("div","card-title");
                cardtitle.setAttribute("style","font-size:30px;")
                cardtitle.innerHTML = `Status <br>Number: ${data.international_number}`;
                var cardbody = createTag("div","card-body");
                var h4 = createTag("h4");
                h4.innerText = "Phone Number Information";
                var ul = createTag("ul","list-group");
                var li1 = createTag("li","list-group-item");
                li1.innerText = `Country: ${data.country}`;
                var li2 = createTag("li","list-group-item");
                li2.innerText = `Phone Region: ${phonereg}`;
                var li3 = createTag("li","list-group-item");
                li3.innerText = `Phone Type: ${phonetype}`;
                var li4 = createTag("li","list-group-item");
                li4.innerText = `Valid: ${data.phone_valid}`;
                if(data.carrier){
                    var li5 = createTag("li","list-group-item");
                    li5.innerText = `Carrier: ${data.carrier}`;
                    ul.append(li1,li2,li3,li4,li5);
                }
                else
                ul.append(li1,li2,li3,li4);
                cardbody.append(h4,ul);
                card.append(cardtitle,cardbody);
                col.append(card);
            }
            else{
                card.setAttribute("style","box-shadow: 0.5rem 0.5rem rgb(253, 99, 99); padding:20px;");
                var cardtitle = createTag("div","card-title");
                cardtitle.setAttribute("style","font-size:20px;")
                cardtitle.innerText="Status";
                var cardbody = createTag("div","card-body");
                cardbody.setAttribute("style","color:rgb(253, 99, 99)");
                cardbody.innerText = `The number: ${phonenum} is not valid`;
                card.append(cardtitle,cardbody);
                col.append(card);
            }
            
        }
        catch(error){
            console.log(error);
        }
    }
    else
    alert("Please enter all the details");
}
