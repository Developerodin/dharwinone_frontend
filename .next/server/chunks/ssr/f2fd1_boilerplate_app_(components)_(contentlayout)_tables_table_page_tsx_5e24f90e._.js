module.exports=[864497,a=>{"use strict";var b=a.i(273404);let c=[{id:1,src:"../../assets/images/faces/13.jpg",name:"Sukuro Kim",mail:"kimosukuro@gmail.com",color:"success/10 ",class:"",text:"Active",class1:"online",color1:"success"},{id:2,src:"../../assets/images/faces/6.jpg",name:"Hasimna",mail:"hasimna2132@gmail.com",color:"light",class:"text-default",text:"Inactive",class1:"offline",color1:"dark"},{id:3,src:"../../assets/images/faces/15.jpg",name:"Azimo Khan",mail:"azimokhan421@gmail.com",color:"success/10 ",class:"",text:"Active",class1:"online",color1:"success"},{id:4,src:"../../assets/images/faces/5.jpg",name:"Samantha Julia",mail:"	julianasams143@gmail.com",color:"success/10 ",class:"",text:"Active",class1:"online",color1:"success"}],d=[{id:1,order:"2022R-01",date:"27-010-2022",name:"Moracco"},{id:2,order:"2022R-02",date:"28-10-2022",name:"Thornton"},{id:3,order:"2022R-03",date:"22-10-2022",name:"Larry Bird"},{id:4,order:"2022R-04",date:"29-09-2022",name:"Erica Sean"}],e=[{id:1,text1:"Mark",text2:"Otto",text3:"@mdo"},{id:2,text1:"Jacob",text2:"Thornton",text3:"@fat"},{id:3,text1:"Larry the Bird",text2:"Thornton",text3:"@twitter"}],f=[{id:1,name:"Harshrath",date:"24 May 2022",text:"	#5182-3467",btn:"Pending",color:"primary"},{id:2,name:"Zozo Hadid",date:"02 July 2022",text:"#5182-3412",btn:"Pending",color:"primary"},{id:3,name:"Martiana",date:"15 April 2022",text:"#5182-3423",btn:"Rejected",color:"danger"},{id:4,name:"Alex Carey",date:"17 March 2022",text:"#5182-3456",btn:"Processed",color:"success"}],g=[{id:1,text:"Default",color:"primary/10",quantity:"22",price:"$2,012",class1:"",class2:"bg-primary/10 text-primary",name:"Rita Book"},{id:2,text:"Primary",color:"primary",quantity:"22",price:"$4,254",class1:"table-primary",class2:"bg-primary text-white",name:"Rhoda Report"},{id:3,text:"Secondary",color:"secondary",quantity:"26",price:"$1,234",class1:"table-secondary",class2:"bg-secondary text-white",name:"Rita Book"},{id:4,text:"Success",color:"success",quantity:"42",price:"$2,623",class1:"table-success",class2:"bg-success text-white",name:"Anne Teak"},{id:5,text:"Danger",color:"danger",quantity:"52",price:"$32,132",class1:"table-danger",class2:"bg-danger text-white",name:"Dee End"},{id:6,text:"Warning",color:"warning",quantity:"10",price:"$1,434",class1:"table-warning",class2:"bg-warning text-white",name:"Lee Nonmi"},{id:7,text:"Info",color:"info",quantity:"63",price:"$1,854",class1:"table-info",class2:"bg-info text-white",name:"Lynne Gwistic"},{id:8,text:"Light",color:"light",quantity:"05",price:"$823",class1:"table-light",class2:"bg-light text-dark",name:"Fran Tick"},{id:9,text:"Dark",color:"dark",quantity:"35",price:"$1,832",class1:"table-dark",class2:"bg-black text-white",name:"Polly Pipe"}];var h=a.i(286214),i=a.i(502806),j=a.i(357022),k=a.i(170051);let l=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap min-w-full">
<thead><tr className="border-b border-defaultborder">
<th scope="col" className="text-start">Name</th>
<th scope="col" className="text-start">Created On</th>
<th scope="col" className="text-start">Number</th>
<th scope="col" className="text-start">Status</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Mark</th>
<td>21,Dec 2021</td>
<td>+1234-12340</td>
<td><span className="badge bg-outline-primary">Completed
</span>
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Monika</th>
<td>29,April 2022</td><td>+1523-12459</td>
<td><span className="badge bg-outline-warning">Failed</span>
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Madina</th>
<td>30,Nov 2022</td>
<td>+1982-16234</td>
<td><span className="badge bg-outline-success">Successful</span>
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Bhamako</th>
<td>18,Mar 2022</td>
<td>+1526-10729</td>
<td><span className="badge bg-outline-secondary">Pending</span></td>
</tr>
</tbody>
</table>
</div>
// End Prism Code//`,m=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap table-bordered min-w-full">
<thead>
<tr className="border-b border-defaultborder">
<th scope="col" className="text-start">User</th>
<th scope="col" className="text-start">Status</th>
<th scope="col" className="text-start">Email</th>
<th scope="col" className="text-start">Action</th>
</tr></thead><tbody>{Table1data.map((idx) => 
(<tr className="border-b border-defaultborder" 
key={Math.random()}><th scope="row">
<div className="flex items-center">
<span className={&#96;avatar avatar-xs me-2
     &#36;{idx.class1} avatar-rounded&#96;}>
     <img src={idx.src} alt="img" /></span>
     {idx.name}</div>
     </th>
<td><span className={&#96;badge bg-&#36;{idx.color}/10
 text-&#36;{idx.color1}&#96;}>{idx.text}</span></td>
 <td>{idx.mail}</td>
 <td>
 <div className="hstack gap-2 flex-wrap">
 <Link aria-label="anchor" href="#" 
 className="text-info text-[.875rem] leading-none">
 <iclassName="ri-edit-line"></i></Link>
 <Link aria-label="anchor" href="#" className="text-danger
  text-[.875rem] leading-none"><iclassName="ri-delete-bin-5-line">
  </i></Link></div></td></tr>))}
  </tbody>
  </table>
</div>
// End Prism Code//`,n=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="box-body">
<div className="table-responsive">
<table className="table whitespace-nowrap table-bordered 
table-bordered-primary border-primary/10 min-w-full">
<thead><tr className="border-b border-primary/10">
<th scope="col" className="text-start">Order</th>
<th scope="col" className="text-start">Date</th>
<th scope="col" className="text-start">Customer</th>
<th scope="col" className="text-start">Action</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-primary/10">
<th scope="row" className="text-start">#0007
</th>
<td><span className="badge bg-light text-dark">
26-04-2022</span>
</td>
<td>
<div className="flex items-center">
<span className="avatar avatar-xs me-2 online 
avatar-rounded"><img src="../../assets/images/faces/3.jpg" 
alt="img" /></span>Mayor Kelly</div>
</td>
<td>
<span className="badge bg-primary/10 text-primary">
Booked</span>
</td>
</tr>
<tr className="border-b border-primary/10">
<th scope="row" className="text-start">#0008
</th><td><span className="badge bg-light
 text-dark">15-02-2022</span>
 </td>
 <td><div className="flex items-center">
 <span className="avatar avatar-xs me-2 
 online avatar-rounded">
 <img src="../../assets/images/faces/6.jpg" 
 alt="img" /></span>Wicky Kross</div>
 </td>
 <td>
 <span className="badge bg-primary/10 text-primary">Booked</span>
 </td></tr><tr><th scope="row" className="text-start">#0009</th>
 <td><span className="badge bg-light text-dark">23-05-2022</span>
 </td><td><div className="flex items-center">
 <span className="avatar avatar-xs me-2 online avatar-rounded">
 <img src="../../assets/images/faces/1.jpg" alt="img" /></span>
 Julia Cam</div></td><td>
 <span className="badge bg-primary/10 text-primary">
 Booked</span></td></tr>
 </tbody>
 </table>
 </div>
</div>
// End Prism Code//`,o=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="box-body">
<div className="table-responsive">
<table className="table whitespace-nowrap table-bordered 
table-bordered-success min-w-full">
<thead>
<tr className="border-b border-success/10">
<th scope="col" className="text-start">Order</th>
<th scope="col" className="text-start">Date</th>
<th scope="col" className="text-start">Customer</th>
<th scope="col" className="text-start">Status</th>
</tr>
</thead>
<tbody>
<tr className="border-b 
border-success/10">
<th scope="row" className="text-start">#0011</th>
<td><span className="badge bg-light text-dark">
07-01-2022</span></td>
<td><div className="flex items-center">
<span className="avatar avatar-xs me-2 online
 avatar-rounded"><img src="../../assets/images/faces/10.jpg" 
 alt="img" /></span>Helsenky</div>
 </td>
 <td>
 <span className="badge bg-success/10 text-success">
 Delivered</span></td>
 </tr>
 <tr className="border-b border-success/10">
 <th scope="row" className="text-start">#0012</th>
 <td><span className="badge bg-light text-dark">
 18-05-2022</span></td><td>
 <div className="flex items-center">
 <span className="avatar avatar-xs me-2 online avatar-rounded">
 <img src="../../assets/images/faces/14.jpg" alt="img" />
 </span>Brodus</div>
 </td>
 <td><span className="badge bg-success/10
  text-success">Delivered</span>
</td>
</tr>
<tr><th scope="row" className="text-start">#0013</th>
<td><span className="badge bg-light text-dark">
19-03-2022</span>
</td>
<td><div className="flex items-center">
<span className="avatar avatar-xs me-2 online avatar-rounded">
<img src="../../assets/images/faces/12.jpg" alt="img" />
</span>Chikka Alen</div>
</td>
<td>
<span className="badge bg-success/10 text-success">Delivered
</span></td></tr>
</tbody>
</table>
</div>
</div>
// End Prism Code//`,p=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="box-body">
<div className="table-responsive">
<table className="table whitespace-nowrap 
table-bordered table-bordered-warning min-w-full">
<thead><tr className="border-b border-warning/10">
<th scope="col" className="text-start">Order</th>
<th scope="col" className="text-start">Date</th>
<th scope="col" className="text-start">Customer</th>
<th scope="col" className="text-start">Action</th>
</tr></thead><tbody><tr className="border-b
 border-warning/10"><th scope="row" 
 className="text-start">#0014</th>
 <td>
 <span className="badge bg-light text-dark">
 21-02-2022</span></td>
 <td>
 <div className="flex items-center">
 <span className="avatar avatar-xs me-2 online
  avatar-rounded">
  <img src="../../assets/images/faces/13.jpg" alt="img" />
  </span>Sukuro Kim
  </div>
  </td>
  <td>
  <span className="badge bg-warning/10 text-warning">Accepted</span>
  </td></tr><tr className="border-b border-warning/10">
  <th scope="row" className="text-start">#0018</th>
  <td><span className="badge bg-light text-dark">26-03-2022</span>
  </td><td><div className="flex items-center">
  <span className="avatar avatar-xs me-2 online avatar-rounded">
  <img src="../../assets/images/faces/11.jpg" alt="img" />
  </span>Alex Carey</div></td><td>
  <span className="badge bg-warning/10 text-warning">
  Accepted</span></td>
  </tr>
  <tr>
  <th scope="row" className="text-start">#0020</th><td>
  <span className="badge bg-light text-dark">14-03-2022</span>
  </td><td><div className="flex items-center">
  <span className="avatar avatar-xs me-2 online avatar-rounded">
  <img src="../../assets/images/faces/2.jpg" alt="img" />
  </span>Pamila Anderson</div></td><td>
  <span className="badge bg-warning/10 text-warning">Accepted</span>
  </td>
  </tr>
  </tbody>
  </table>
  </div>
</div>
// End Prism Code//`,q=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap table-borderless 
min-w-full"><thead><tr><th scope="col" className="text-start">
User Name</th><th scope="col" className="text-start">
Transaction Id</th><th scope="col" className="text-start">
Created</th><th scope="col" className="text-start">
Status</th></tr></thead><tbody>
<tr>
<th scope="row" className="text-start">
Harshrath</th><td>#5182-3467</td>
<td>24 May 2022</td>
<td>
<span className="badge bg-primary text-white">
Fixed</span></td></tr>
<tr>
<th scope="row" className="text-start">
Zozo Hadid</th><td>#5182-3412</td>
<td>02 July 2022</td>
<td>
<span className="badge bg-warning  text-white">
In Progress</span>
</td>
</tr>
<tr>
<th scope="row" className="text-start">
Martiana</th>
<td>#5182-3423</td>
<td>15 April 2022</td>
<td><span className="badge bg-success  text-white">
Completed</span></td>
</tr>
<tr><th scope="row" className="text-start">
Alex Carey</th>
<td>#5182-3456</td>
<td>17 March 2022</td>
<td><span className="badge bg-danger  
text-white">Pending</span></td>
</tr>
</tbody>
</table>
</div>
// End Prism Code//`,r=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap min-w-full ">
<thead>
<tr><th scope="col" className="text-start">
Product</th><th scope="col" className="text-start">
Seller</th><th scope="col" className="text-start">
Sale Percentage</th><th scope="col" className="text-start">
Qunatity Sold</th></tr>
</thead>
<tbody className="table-group-divider dark:border-defaultborder/10">
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">
Smart Watch</th><td>Slowtrack.inc</td>
<td>
<Link href="#" className="text-success">24.23%
<i className="ri-arrow-up-fill ms-1"></i></Link></td>
<td>250/1786</td></tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">White Sneakers</th>
<td>American &amp; Co.inc</td>
<td><Link href="#" className="text-danger">12.45%
<i className="ri-arrow-down-fill ms-1"></i></Link></td><
td>123/985</></tr><tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Baseball Bat</th>
<td>
Sports Company</td><td><Link href="#" className="text-success">
06.64%<iclassName="ri-arrow-up-fill ms-1"></i></Link>
</td>
<td>124/232</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Black Hoodie
</th><td>Renonds Fabrics</td><td><Link href="#" 
className="text-success">14.42%<iclassName="ri-arrow-up-fill ms-1">
</i></Link></td><td>192/2456</td></tr>
</tbody>
</table>
</div>
// End Prism Code//`,s=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap ti-striped-table min-w-full">
<thead><tr className="border-b border-defaultborder">
<th scope="col" className="text-start">ID</th>
<th scope="col" className="text-start">Date</th>
<th scope="col" className="text-start">Customer</th>
<th scope="col" className="text-start">Action</th>
</tr></thead><tbody>{Table5data.map((idx) => 
(<tr className="border-b border-defaultborder" 
key={Math.random()}><th scope="row">{idx.order}</th>
<td>{idx.date}</td><td>{idx.name}</td><td><button 
type="button" className="ti-btn !py-1 !px-2 !text-[0.75rem]
 ti-btn-success-full btn-wave">
 <i className="ri-download-2-line align-middle me-2 inline-block">
 </i>Download</button></td></tr>))}
 </tbody>
 </table>
</div>
// End Prism Code//`,t=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap table-striped-columns
 min-w-full"><thead><tr className="border-b border-defaultborder">
 <th scope="col" className="text-start">ID</th><th scope="col"
  className="text-start">Date</th><th scope="col" className="text-start">
  Customer</th><th scope="col" className="text-start">Action</th></tr>
  </thead><tbody>{Table5data.map((idx) =>
<tr className="border-b border-defaultborder " key={Math.random()}>
th scope="row">{idx.order}</th><td>{idx.date}</td><td>{idx.name}
/td>
td><button type="button" className="ti-btn !py-1 !px-2 !text-[0.75rem]
ti-btn-danger-full btn-wave"><i className="ri-download-2-line 
align-middle me-2 inline-block"></i>Delete</button></td>
</tr>))}</tbody>
</table>
</div>
// End Prism Code//`,u=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap table-primary
 !rounded-none min-w-full">
 <thead>
 <tr className="border-b border-primary/10">
 <th scope="col" className="text-start">#</th>
 <th scope="col" className="text-start">First</th>
 <th scope="col" className="text-start">Last</th>
 <th scope="col" className="text-start">Handle</th>
 </tr></thead><tbody>{Table6data.map((idx) => 
(<tr key={Math.random()}><th scope="row"
 className="text-start">{idx.id}</th>
 <td>{idx.text1}</td>
 <td>{idx.text2}</td>
 <td>{idx.text3}</td>
 </tr>))}
 </tbody>
 </table>
</div>
// End Prism Code//`,v=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap table-secondary
 !rounded-none min-w-full">
 <thead>
 <tr className="border-b border-secondary/10">
 <th scope="col" className="text-start">#</th>
 <th scope="col" className="text-start">First</th>
 <th scope="col" className="text-start">Last</th>
 <th scope="col" className="text-start">Handle</th>
 </tr></thead><tbody>{Table6data.map((idx) =>
(<tr key={Math.random()}><th scope="row"
 className="text-start">{idx.id}</th><td>
 {idx.text1}</td><td>{idx.text2}</td><td>
 {idx.text3}</td></tr>))}</tbody>
 </table>
</div>
// End Prism Code//`,w=`//<!-- Prism Code: This code is only used for showcode purpose -->//
  <div className="table-responsive">
<table className="table whitespace-nowrap table-warning 
!rounded-none min-w-full"><thead><tr className="border-b
 border-warning/10"><th scope="col" className="text-start">
 #</th><th scope="col" className="text-start">First</th>
 <th scope="col" className="text-start">Last</th>
 <th scope="col" className="text-start">Handle</th>
 </tr></thead><tbody>{Table6data.map((idx) => 
(<tr key={Math.random()}><th scope="row" 
className="text-start">{idx.id}</th><td>{idx.text1}
</td><td>{idx.text2}</td><td>{idx.text3}</td></tr>))}
</tbody>
</table>
</div>
// End Prism Code//`,x=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap table-danger  
!rounded-none min-w-full"><thead><tr className="border-b
 border-danger/10"><th scope="col" className="text-start">#</th>
 <th scope="col" className="text-start">First</th>
 <th scope="col" className="text-start">Last</th>
 <th scope="col" className="text-start">Handle</th>
 </tr>
 </thead>
 <tbody>{Table6data.map((idx) => (<tr key={Math.random()}>
 <th scope="row" className="text-start">{idx.id}</th><td>
 {idx.text1}</td><td>{idx.text2}</td><td>{idx.text3}</td>
 </tr>))}
 </tbody>
 </table>
</div>
// End Prism Code//`,y=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap table-dark 
!rounded-none min-w-full">
<thead>
<tr className="border-b border-black/10 
dark:border-black/[0.025];"><th scope="col" 
className="text-start">#</th>
<th scope="col" className="text-start">First</th>
<th scope="col" className="text-start">Last</th>
<th scope="col" className="text-start">Handle</th>
</tr></thead><tbody>{Table6data.map((idx) => 
    (<tr key={Math.random()}><th scope="row"
     className="text-start">{idx.id}</th><td>
     {idx.text1}</td><td>{idx.text2}</td><td>
     {idx.text3}</td></tr>))}</tbody>
     </table>
</div>
// End Prism Code//`,z=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap table-success 
table-striped  !rounded-none min-w-full">
<thead><tr className="border-b border-success/10">
<th scope="col" className="text-start">#</th>
<th scope="col" className="text-start">First</th>
<th scope="col" className="text-start">Last</th>
<th scope="col" className="text-start">Handle</th>
</tr></thead><tbody>{Table6data.map((idx) => 
(<tr key={Math.random()}><th scope="row" 
className="text-start">{idx.id}</th><td>
{idx.text1}</td><td>{idx.text2}</td><td>
{idx.text3}</td></tr>))}</tbody></table>
</div>
// End Prism Code//`,A=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap table-hover min-w-full 
ti-custom-table-hover"><thead>
<tr className="border-b border-defaultborder">
<th scope="col" className="text-start">Product Manager</th>
<th scope="col" className="text-start">Category</th>
<th scope="col" className="text-start">Team</th>
<th scope="col" className="text-start">Status</th>
</tr></thead><tbody><tr className="border-b border-defaultborder">
<td><div className="flex items-center">
<div className="avatar avatar-sm me-2 avatar-rounded">
<img src="../../assets/images/faces/10.jpg" alt="img" />
</div><div><div className="leading-none"><span>Joanna Smith</span>
</div>
<div className="leading-none">
<spanclassName="text-[0.6875rem] text-[#8c9097] 
dark:text-white/50">joannasmith14@gmail.com</span>
</div>
</div>
</div>
</td>
<td>
<span className="badge bg-primary/10 text-primary">Fashion</span>
</td><td><div className="avatar-list-stacked">
<span className="avatar avatar-sm avatar-rounded">
<img src="../../assets/images/faces/2.jpg" alt="img" />
</span><span className="avatar avatar-sm avatar-rounded">
<img src="../../assets/images/faces/8.jpg" alt="img" />
</span><span className="avatar avatar-sm avatar-rounded">
<img src="../../assets/images/faces/2.jpg" alt="img" />
</span><Link className="avatar avatar-sm bg-primary text-white 
avatar-rounded"href="#">+5</Link></div></td><td>
<div className="progress progress-xs">
<div className="progress-bar bg-primary w-[52%]" 
aria-valuenow="52" aria-valuemin="0"aria-valuemax="100">
</div>
</div>
</td>
</tr>
<tr className="border-b border-defaultborder">
<td><div className="flex items-center">
<div className="avatar avatar-sm me-2 avatar-rounded">
<img src="../../assets/images/faces/2.jpg" alt="img" />
</div><div><div className="leading-none"><span>Kara Kova</span>
</div><div className="leading-none"><spanclassName="text-[0.6875rem]
 text-[#8c9097] dark:text-white/50">milesakara@gmail.com</span>
 </div></div></div></td><td><span className="badge bg-warning/10 
 text-warning">Clothing</span></td>
 <td><div className="avatar-list-stacked"><span className="avatar 
 avatar-sm avatar-rounded">
 <img src="../../assets/images/faces/4.jpg" alt="img" /></span>
 <span className="avatar avatar-sm avatar-rounded">
 <img src="../../assets/images/faces/6.jpg" alt="img" />
 </span><Link className="avatar avatar-sm bg-primary text-white 
 avatar-rounded"href="#">+6</Link></div></td>
 <td>
 <div className="progress progress-xs">
 <div className="progress-bar bg-primary w-2/5"
  aria-valuenow="40" aria-valuemin="0"aria-valuemax="100">
  </div>
  </div>
  </td>
  </tr><tr className="border-b border-defaultborder ">
  <td><div className="flex items-center">
  <div className="avatar avatar-sm me-2 avatar-rounded">
  <img src="../../assets/images/faces/16.jpg" alt="img" />
  </div><div><div className="leading-none">
  <span>Donald Trimb</span></div>
  <div className="leading-none"><spanclassName="text-[0.6875rem] 
  text-[#8c9097] dark:text-white/50">donaldo21@gmail.com</span>
  </div></div></div></td><td>
  <span className="badge bg-dark/10 text-black dark:text-white">
  Electronics</span></td><td><div className="avatar-list-stacked">
  <span className="avatar avatar-sm avatar-rounded">
  <img src="../../assets/images/faces/1.jpg" alt="img" />
  </span><span className="avatar avatar-sm avatar-rounded">
  <img src="../../assets/images/faces/11.jpg" alt="img" />
  </span><span className="avatar avatar-sm avatar-rounded"><
  img src="../../assets/images/faces/15.jpg" alt="img" />
  </span><Link className="avatar avatar-sm bg-primary text-white 
  avatar-rounded"href="#">+2</Link></div></td><td>
  <div className="progress progress-xs">
  <div className="progress-bar bg-primary w-[17%]" aria-valuenow="17"
   aria-valuemin="0"aria-valuemax="100"></div>
   </div>
   </td>
   </tr>
   <tr className="border-b border-defaultborder ">
   <td><div className="flex items-center">
   <div className="avatar avatar-sm me-2 avatar-rounded">
   <img src="../../assets/images/faces/13.jpg" alt="img" />
   </div><div><div className="leading-none">
   <span>Justin Gaethje</span></div>
   <div className="leading-none">
   <spanclassName="text-[0.6875rem] text-[#8c9097] 
   dark:text-white/50">justingae@gmail.com</span></div>
   </div>
   </div>
   </td>
   <td>
   <span className="badge bg-danger/10 text-danger">Sports</span>
   </td><td><div className="avatar-list-stacked">
   <span className="avatar avatar-sm avatar-rounded">
   <img src="../../assets/images/faces/4.jpg" alt="img" />
   </span><span className="avatar avatar-sm avatar-rounded">
   <img src="../../assets/images/faces/6.jpg" alt="img" />
   </span><Link className="avatar avatar-sm bg-primary
    text-white avatar-rounded"href="#">+5</Link>
    </div>
    </td>
    <td><div className="progress progress-xs">
    <div className="progress-bar bg-primary w-[72%]" aria-valuenow="72"
     aria-valuemin="0"aria-valuemax="100"></div>
</div>
</td>
</tr>
</tbody>
</table>
</div>
// End Prism Code//`,B=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap ti-striped-table
 table-hover min-w-full ti-custom-table-hover"><thead>
 <tr className="border-b border-defaultborder">
 <th scope="col" className="text-start">Invoice</th>
 <th scope="col" className="text-start">Customer</th>
 <th scope="col" className="text-start">Status</th>
 <th scope="col" className="text-start">Date</th>
 </tr>
 </thead><tbody><tr className="border-b border-defaultborder">
 <th scope="row">IN-2032</th><td><div className="flex items-center">
 <div className="avatar avatar-sm me-2 avatar-rounded">
 <img src="../../assets/images/faces/15.jpg" alt="img" />
 </div><div><div className="leading-none"><span>Mark Cruise</span></div>
 <div className="leading-none"><spanclassName="text-[0.6875rem] text-[#8c9097]
  dark:text-white/50">markcruise24@gmail.com</span></div></div></div></td><td>
  <span className="badge bg-success/10 text-success"><iclassName="ri-check-fill 
  align-middle me-1"></i>Paid</span></td><td>Jul 26,2022</td></tr>
  <tr className="border-b border-defaultborder ">
  <th scope="row">IN-2022</th>
  <td><div className="flex items-center">
  <div className="avatar avatar-sm me-2 avatar-rounded">
   <img src="../../assets/images/faces/12.jpg" alt="img" />
    </div>
    <div>
    <div className="leading-none"><span>Charanjeep</span>
    </div>
    <div className="leading-none">
    <span nclassName="text-[0.6875rem] text-[#8c9097]
     dark:text-white/50">charanjeep@gmail.in</span></div>
     </div>
     </div>
     </td>
     <td><span className="badge bg-success/10 text-success">
     <iclassName="ri-check-fill align-middle me-1"></i>Paid</span>
     </td>
     <td>Mar 14,2022</td>
     </tr>
     <tr className="border-b border-defaultborder">
     <th scope="row">IN-2014</th>
     <td>
     <div className="flex items-center">
     <div className="avatar avatar-sm me-2 avatar-rounded">
     <img src="../../assets/images/faces/5.jpg" alt="img" />
     </div>
     <div>
     <div className="leading-none"><span>
     Samantha Julie</span>
     </div>
     <div className="leading-none"><span className="text-[0.6875rem] 
     text-[#8c9097] dark:text-white/50">julie453@gmail.com</span></div>
     </div>
     </div>
     </td>
<td><span className="badge bg-danger/10 text-danger">
<iclassName="ri-close-fill align-middle me-1"></i>Cancelled</span>
</td><td>Feb 1,2022</td></tr><tr className="border-b border-defaultborder">
<th scope="row">IN-2036</th><td><div className="flex items-center">
<div className="avatar avatar-sm me-2 avatar-rounded">
<img src="../../assets/images/faces/11.jpg" alt="img" />
</div><div><div className="leading-none"><span>Simon Cohen</span>
</div><div className="leading-none"><span className="text-[0.6875rem]
 text-[#8c9097] dark:text-white/50">simon@gmail.com</span></div>
 </div>
 </div>
 </td>
 <td><span className="badge bg-light text-black dark:text-white">
 <iclassName="ri-reply-line align-middle me-1"></i>Refunded</span></td>
 <td>Apr 24,2022</td>
 </tr>
 </tbody>
 </table>
</div>
// End Prism Code//`,C=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap min-w-full">
<thead className="bg-primary/10">
<tr className="border-b border-primary/10">
<th scope="col" className="text-start">User Name</th>
<th scope="col" className="text-start">Transaction Id</th>
<th scope="col" className="text-start">Created</th>
<th scope="col" className="text-start">Status</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-primary/10">
<th scope="row" className="text-start">Harshrath</th>
<td>#5182-3467</td>
<td>24 May 2022</td>
<td>
<div className="hstack flex gap-3 text-[.9375rem]">
<Link aria-label="anchor" href="#"
className="ti-btn ti-btn-sm ti-btn-success !rounded-full">
<iclassName="ri-download-2-line"></i></Link>
<Link aria-label="anchor" href="#"
className="ti-btn ti-btn-sm ti-btn-info !rounded-full">
<i className="ri-edit-line"></i></Link><Link aria-label="anchor"
 href="#"className="ti-btn ti-btn-sm ti-btn-danger !rounded-full">
 <i className="ri-delete-bin-line"></i>
 </Link>
 </div>
 </td>
 </tr>
 <tr className="border-b border-primary/10">
 <th scope="row" className="text-start">Zozo Hadid</th>
 <td>#5182-3412</td>
 <td>02 July 2022</td>
 <td>
 <div className="hstack flex gap-3 text-[.9375rem]">
 <Link aria-label="anchor" href="#" 
 className="ti-btn ti-btn-sm ti-btn-success !rounded-full">
 <iclassName="ri-download-2-line"></i></Link>
 <Link aria-label="anchor" href="#"className="ti-btn ti-btn-sm 
 ti-btn-info !rounded-full">
 <iclassName="ri-edit-line"></i>
 </Link>
 <Link aria-label="anchor" href="#" className="ti-btn ti-btn-sm ti-btn-danger
  !rounded-full">
  <iclassName="ri-delete-bin-line"></i>
  </Link>
  </div>
  </td>
  </tr>
  <tr className="border-b border-primary/10">
  <th scope="row" className="text-start">
  Martiana</th>
  <td>#5182-3423</td>
  <td>15 April 2022</td>
  <td><div className="hstack flex gap-3 text-[.9375rem]">
  <Link aria-label="anchor" href="#"
  className="ti-btn ti-btn-sm ti-btn-success !rounded-full">
  <iclassName="ri-download-2-line"></i></Link>
  <Link aria-label="anchor" href="#" 
  className="ti-btn ti-btn-sm ti-btn-info !rounded-full">
  <iclassName="ri-edit-line"></i></Link>
  <Link aria-label="anchor" href="#"
  className="ti-btn ti-btn-sm ti-btn-danger !rounded-full">
  <iclassName="ri-delete-bin-line"></i></Link>
  </div>
  </td></tr><tr className="border-b border-primary/10">
  <th scope="row" className="text-start">Alex Carey</th>
  <td>#5182-3456</td><td>17 March 2022</td>
  <td><div className="hstack flex gap-3 text-[.9375rem]">
  <Link aria-label="anchor" href="#" 
  className="ti-btn ti-btn-sm ti-btn-success !rounded-full">
  <iclassName="ri-download-2-line"></i></Link>
  <Link aria-label="anchor" href="#" 
  className="ti-btn ti-btn-sm ti-btn-info !rounded-full">
  <iclassName="ri-edit-line"></i></Link>
  <Link aria-label="anchor" href="#" 
  className="ti-btn ti-btn-sm ti-btn-danger !rounded-full">
  <iclassName="ri-delete-bin-line"></i></Link>
  </div>
  </td>
  </tr>
  </tbody>
  </table>
</div>
// End Prism Code//`,D=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap min-w-full">
<thead className="bg-warning/10">
<tr className="border-b border-defaultborder">
<th scope="col" className="text-start">User Name</th>
<th scope="col" className="text-start">Transaction Id</th>
<th scope="col" className="text-start">Created</th>
<th scope="col" className="text-start">Status</th>
</tr></thead><tbody>{tablehead.map((idx) => 
    (<tr key={Math.random()} className="border-b border-defaultborder">
    <th scope="row"  className="text-start">{idx.name}</th>
    <td>{idx.text}</td><td>{idx.date}</td>
    <td><button type="button" 
className={&#96;ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-&#36;{idx.color}&#96;}>
{idx.btn}</button></td>
</tr>))}
</tbody>
</table>
</div>
// End Prism Code//`,E=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap min-w-full">
<thead className="bg-success/10"><tr className="border-b border-defaultborder">
<th scope="col" className="text-start">User Name</th>
<th scope="col" className="text-start">Transaction Id</th>
<th scope="col" className="text-start">Created</th>
<th scope="col" className="text-start">Status</th>
</tr>
</thead>
<tbody>
{tablehead.map((idx) => (<tr key={Math.random()} 
className="border-b border-defaultborder">
<th scope="row"  className="text-start">{idx.name}</th>
<td>{idx.text}</td><td>{idx.date}</td>
<td><button type="button" 
className={&#96;ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-&#36;{idx.color}&#96;}>
{idx.btn}</button>
</td></tr>))}
</tbody>
</table>
</div>
// End Prism Code//`,F=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap min-w-full">
<thead className="bg-info/10"><tr className="border-b border-defaultborder">
<th scope="col" className="text-start">User Name</th>
<th scope="col" className="text-start">Transaction Id</th>
<th scope="col" className="text-start">Created</th>
<th scope="col" className="text-start">Status</th>
</tr>
</thead>
<tbody>{tablehead.map((idx) => 
(<tr key={Math.random()} className="border-b border-defaultborder">
<th scope="row"  className="text-start">{idx.name}</th>
<td>{idx.text}</td>
<td>{idx.date}</td>
<td>
<button type="button"
className={&#96;ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-&#36;{idx.color}&#96;}>
{idx.btn}</button></td></tr>))}
</tbody>
</table>
</div>
// End Prism Code//`,G=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap min-w-full">
<thead className="bg-secondary/10">
<tr className="border-b border-defaultborder">
<th scope="col" className="text-start">
User Name</th>
<th scope="col" className="text-start">
Transaction Id</th>
<th scope="col" className="text-start">Created</th>
<th scope="col" className="text-start">Status</th>
</tr></thead><tbody>{tablehead.map((idx) => 
(<tr key={Math.random()} className="border-b border-defaultborder">
<th scope="row"  className="text-start">{idx.name}</th>
<td>{idx.text}</td><td>{idx.date}</td>
<td><button type="button" 
className={&#96;ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-&#36;{idx.color}&#96;}>
{idx.btn}</button></td></tr>))}
</tbody>
</table>
</div>
// End Prism Code//`,H=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap min-w-full">
<thead className="bg-danger/10"><tr className="border-b border-defaultborder">
<th scope="col" className="text-start">User Name</th>
<th scope="col" className="text-start">Transaction Id</th>
<th scope="col" className="text-start">Created</th>
<th scope="col" className="text-start">Status</th>
</tr>
</thead>
<tbody>{tablehead.map((idx) =>
     (<tr key={Math.random()} className="border-b border-defaultborder">
     <th scope="row"  className="text-start">{idx.name}</th>
     <td>{idx.text}</td><td>{idx.date}</td>
<td><button type="button" 
className={&#96;ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-&#36;{idx.color}&#96;}>
{idx.btn}</button></td>
</tr>))}
</tbody>
</table>
</div>
// End Prism Code//`,I=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap min-w-full">
<thead className="bg-primary/10">
<tr className="border-b border-defaultborder">
<th scope="col">S.No</th><th scope="col">Team</th>
<th scope="col">Matches Won
</th><th scope="col">Win Ratio</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-defaultborder">
<th scope="row">01</th>
<td>Manchester</td>
<td>232</td>
<td><span className="badge bg-primary text-white">
42%</span>
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row">02</th><td>Barcelona</td>
<td>175</td>
<td><span className="badge bg-primary text-white">58%</span>
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row">03</th><td>Portugal</td>
<td>126</td>
<td><span className="badge bg-primary text-white">32%</span>
</td></tr></tbody><tfoot className="bg-primary/10">
<tr className="border-b border-defaultborder">
<th scope="row">Total</th><td>United States</td>
<td>558</td><td><span className="badge bg-primary text-white">
56%</span></td>
</tr>
</tfoot>
</table>
</div>
// End Prism Code//`,J=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap 
min-w-full caption-bottom">
<caption>Top 3 Countries</caption>
<thead>
<tr className="border-b border-defaultborder">
<th scope="col" className="text-start">S.No</th>
<th scope="col" className="text-start">Country</th>
<th scope="col" className="text-start">Medals Won</th>
<th scope="col" className="text-start">No Of Athletes</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">01</th>
<td>United States</td>
<td>2012
<i className="ri-medal-line mx-2"></i></td>
<td>1823
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">02</th>
<td>United Kingdom</td><td>1012
<i className="ri-medal-line mx-2"></i>
</td><td>992</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">03</th>
<td>Germany</td><td>914<i className="ri-medal-line mx-2">
</i></td>
<td>875</td>
</tr>
</tbody>
</table>
</div>
// End Prism Code//`,K=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap caption-top">
<caption>Top IT Companies</caption>
<thead>
<tr className="border-b border-defaultborder">
<th scope="col">S.No</th><th scope="col">Name</th>
<th scope="col">Revenue</th><th scope="col">Country</th>
</tr><thead><tbody><trclassName="border-b border-defaultborder">
<th scope="row">1</th><td>Microsoft</td><td>&#36;170 billion</td>
<td>United States</td></tr className="">
<tr className="border-b border-defaultborder">
<th scope="row">2</th><td>HP</td>
<td>&#36;72 billion</td><td>United States</td>
</tr><tr className="border-b border-defaultborder">
<thscope="row">3</thscope=><td>IBM</td>
<td>&#36;60 billion</td><td>United States</td>
</tr>
</tbody>
</table>
</div>
// End Prism Code//`,L=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap min-w-full">
<thead>
<tr className="border-b border-defaultborder">
<th scope="col" className="text-start">Name</th>
<th scope="col" className="text-start">Created On</th>
<th scope="col" className="text-start">Number</th>
<th scope="col" className="text-start">Status</th>
</tr></thead><tbody><tr className="table-active">
<th scope="row" className="text-start">Mark</th>
<td>21,Dec 2021</td><td>+1234-12340</td>
<td>
<span className="badge bg-primary text-white">
Completed</span></td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Monika</th>
<td>29,April 2022</td><td>+1523-12459</td>
<td><span className="badge bg-warning text-white">
Failed</span></td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Madina</th>
<td>30,Nov 2022</td><td className="table-active">
+1982-16234</td>
<td><span className="badge bg-success text-white">
Successful</span>
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">Bhamako</th>
<td>18,Mar 2022</td>
<td>+1526-10729</td>
<td><span className="badge bg-secondary text-white">
Pending</span></td></tr>
</tbody>
</table>
</div>
// End Prism Code//`,M=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap table-sm min-w-full">
<thead><tr className="border-b border-defaultborder">
<th scope="col" className="text-start">Invoice</th>
<th scope="col" className="text-start">Created Date</th>
<th scope="col" className="text-start">Status</th>
<th scope="col" className="text-start">Action</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">
<div className="form-check">
<input className="form-check-input" type="checkbox" value="" 
id="checkebox-sm" checked />
<label className="form-check-label"
 htmlFor="checkebox-sm">Zelensky</label>
 </div>
 </th>
 <td>25-Apr-2021</td>
 <td>
 <span className="badge bg-success/10 text-succes">
 Paid</span></td>
 <td><div className="hstack flex gap-3 
 text-[.9375rem]"><Link aria-label="anchor" href="#" 
 className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light">
 <i className="ri-download-2-line"></i></Link>
 <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon
ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i>
</Link>
</div>
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">
<div className="form-check">
<input className="form-check-input" type="checkbox"
 value="" id="checkebox-sm1" />
 <label className="form-check-label" htmlFor="checkebox-sm1">
 Kim Jong</label>
 </div>
 </th>
 <td>29-April-2022</td>
 <td><span className="badge bg-danger/10 
 text-danger">Pending</span></td>
 <td><div className="hstack flex gap-3 text-[.9375rem]">
 <Link aria-label="anchor" href="#" className="ti-btn 
 ti-btn-icon ti-btn-sm ti-btn-light">
 <i className="ri-download-2-line"></i>
 </Link><Link aria-label="anchor" href="#" 
 className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light">
 <i className="ri-edit-line"></i></Link>
 </div>
 </td>
 </tr>
 <tr className="border-b border-defaultborder">
 <th scope="row" className="text-start">
 <div className="form-check">
 <input className="form-check-input" type="checkbox" 
 value="" id="checkebox-sm2" />
 <label className="form-check-label" htmlFor="checkebox-sm2">
 Obana</label></div></th><td>30-Nov-2022</td>
 <td>
 <span className="badge bg-success/10 text-success">Paid</span>
 </td><td><div className="hstack flex gap-3 text-[.9375rem]">
 <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light">
 <i className="ri-download-2-line"></i></Link><Link aria-label="anchor" href="#"
className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light">
<i className="ri-edit-line"></i></Link>
</div>
</td>
</tr>
<tr className="border-b border-defaultborder">
<th scope="row" className="text-start">
<div className="form-check">
<input className="form-check-input" type="checkbox" value="" id="checkebox-sm3" />
<label className="form-check-label" htmlFor="checkebox-sm3">Sean Paul</label>
</div>
</th>
<td>01-Jan-2022</td>
<td>
<span className="badge bg-success/10 text-success">
Paid</span></td>
<td><div className="hstack flex gap-3
 text-[.9375rem]"><Link aria-label="anchor" href="#" 
 className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light">
 <i className="ri-download-2-line"></i></Link>
 <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon
ti-btn-sm ti-btn-light"><i className="ri-edit-line"></i></Link>
</div></td></tr><tr className="border-b border-defaultborder">
<th scope="row" className="text-start">
<div className="form-check">
<input className="form-check-input" type="checkbox" value="" 
id="checkebox-sm4" /><label className="form-check-label"
 htmlFor="checkebox-sm4">Karizma</label></div></th>
 <td>14-Feb-2022</td>
 <td><span className="badge bg-danger/10 text-danger">Pending</span>
 </td>
 <td><div className="hstack flex gap-3 text-[.9375rem]">
 <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon 
 ti-btn-sm ti-btn-light"><i className="ri-download-2-line"></i></Link>
 <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-light">
 <i className="ri-edit-line"></i></Link>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
</div>
// End Prism Code//`,N=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap min-w-full">
<thead><tr className="border-b border-defaultborder">
<th scope="col" className="text-start">Color</th>
<th scope="col" className="text-start">Client</th>
<th scope="col" className="text-start">State</th>
<th scope="col" className="text-start">Quantity</th>
<th scope="col" className="text-start">Total Price</th>
</tr></thead><tbody>{Colortables.map((idx) => 
    (<tr key={Math.random()} className={&#96;&#36;{idx.class1} 
    border-b border-defaultborder&#96;}><th scope="row">{idx.text}</th>
    <td>{idx.name}</td><td><span bg={idx.color} 
    className={&#96;badge &#36;{idx.class2}&#96;}>Processed</span>
    </td><td>{idx.quantity}</td><td>{idx.price}</td></tr>))}
    </tbody>
    </table>
</div>
// End Prism Code//`,O=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap table-striped table-bordered min-w-full">
<thead>
  <tr className="border-b border-defaultborder">
      <th scope="col" className="text-start">#</th>
      <th scope="col" className="text-start">First</th>
      <th scope="col" className="text-start">Last</th>
      <th scope="col" className="text-start">Handle</th>
  </tr>
 </thead>
 <tbody>
      <tr className="border-b border-defaultborder">
      <th scope="row" className="text-start">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr className="border-b border-defaultborder">
      <td colSpan="4">
      <table className="table whitespace-nowrap mb-0 min-w-full">
      <thead>
      <tr className="border-b border-defaultborder">
      <th scope="col" className="text-start">Alphabets</th>
      <th scope="col" className="text-start">Users</th>
      <th scope="col" className="text-start">Email</th>
      </tr>
      </thead>
      <tbody>
      <tr className="border-b border-defaultborder">
      <th scope="row" className="text-start">A</th>
      <td>Dino King</td><td>dinoking231@gmail.com</td>
      </tr><tr className="border-b border-defaultborder">
      <th scope="row" className="text-start">B</th>
      <td>Poppins sams</td><td>pops@gmail.com</td>
      </tr>
      <tr className="border-b border-defaultborder">
      <th scope="row" className="text-start">C</th>
      <td>Brian Shaw</td><td>swanbrian@gmail.com</td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      <tr className="border-b border-defaultborder">
      <th scope="row" className="text-start">3</th>
      <td>Larry</td><td>the Bird</td><td>@twitter</td>
      </tr><tr className="border-b border-defaultborder">
      <th scope="row" className="text-start">4</th><td>
      Jimmy</td><td>the Ostrich</td><td>Dummy Text</td>
      </tr><tr className="border-b border-defaultborder">
      <th scope="row" className="text-start">5</th>
      <td>Cobra Kai</td><td>the Snake</td><td>Another Name</td>
      </tr>
 </tbody>
 </table>
</div>
// End Prism Code//`,P=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table whitespace-nowrap min-w-full">
<thead>
  <tr className="border-b border-defaultborder">
    <th scope="col"><input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></th>
    <th scope="col" className="text-start">Team Head</th>
    <th scope="col" className="text-start">Category</th>
    <th scope="col" className="text-start">Role</th>
    <th scope="col" className="text-start">Gmail</th>
    <th scope="col" className="text-start">Team</th>
    <th scope="col" className="text-start">Work Progress</th>
    <th scope="col" className="text-start">Revenue</th>
    <th scope="col" className="text-start">Action</th>
</tr>
</thead>
<tbody>
      <tr className="border-b border-defaultborder">
        <th scope="row">
            <input className="form-check-input" type="checkbox" id="checkboxNoLabel1" value="" aria-label="..." />
            </th>
            <td><div className="flex items-center">
            <span className="avatar avatar-xs me-2 online avatar-rounded">
            <img src="../../assets/images/faces/3.jpg" alt="img" /></span>
            Mayor Kelly</div></td><td>Manufacturer</td>
            <td>
            <span className="badge bg-primary/10 text-primary">Team Lead</span></td>
            <td>mayorkrlly@gmail.com</td>
            <td><div className="avatar-list-stacked">
            <span className="avatar avatar-sm avatar-rounded">
            <img src="../../assets/images/faces/2.jpg" alt="img" />
            </span><span className="avatar avatar-sm avatar-rounded">
            <img src="../../assets/images/faces/8.jpg" alt="img" />
            </span><span className="avatar avatar-sm avatar-rounded">
            <img src="../../assets/images/faces/2.jpg" alt="img" />
            </span>
            <Link className="avatar avatar-sm bg-primary text-white 
            avatar-rounded" href="#">+4</Link></div></td>
            <td>
            <div className="progress progress-xs">
            <div className="progress-bar bg-primary
            w-[52%]" aria-valuenow="52" aria-valuemin="0"
            aria-valuemax="100">
            </div>
            </div>
            </td>
            <td>&#36;10,984.29</td>
            <td><div className="hstack flex gap-3 text-[.9375rem]">
            <Link aria-label="anchor" href="#" className="ti-btn 
            ti-btn-icon ti-btn-sm ti-btn-success-full">
            <i className="ri-download-2-line"></i></Link>
            <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon
            ti-btn-sm ti-btn-info-full"><i className="ri-edit-line"></i></Link>
            </div>
            </td>
      </tr>
      <tr className="border-b border-defaultborder">
      <th scope="row"><input className="form-check-input"
      type="checkbox"  value="" aria-label="..." />
      </th>
      <td><div className="flex items-center">
      <span className="avatar avatar-xs me-2 online avatar-rounded">
      <img src="../../assets/images/faces/12.jpg" alt="img" />
      </span>Andrew Garfield</div></td><td>Managing Director</td>
      <td><span className="badge bg-warning/10 text-warning">
      Director</span></td><td>andrewgarfield@gmail.com</td>
      <td>
      <div className="avatar-list-stacked">
      <span className="avatar avatar-sm avatar-rounded">
      <img src="../../assets/images/faces/1.jpg" alt="img" />
      </span>
      <span className="avatar avatar-sm avatar-rounded">
      <img src="../../assets/images/faces/5.jpg" alt="img" />
      </span>
      <span className="avatar avatar-sm avatar-rounded">
      <img src="../../assets/images/faces/11.jpg" alt="img" />
      </span>
      <span className="avatar avatar-sm avatar-rounded">
      <img src="../../assets/images/faces/15.jpg" alt="img" />
      </span>
      <Link className="avatar avatar-sm bg-primary 
      text-white avatar-rounded" href="#">+4</Link>
      </div>
      </td>
      <td>
      <div className="progress progress-xs">
      <div className="progress-bar bg-primary w-[91%]"
      aria-valuenow="91" aria-valuemin="0" aria-valuemax="100">
      </div>
      </div>
      </td>
      <td>&#36;1.4billion</td>
      <td><div className="hstack flex gap-3 text-[.9375rem]">
      <Link aria-label="anchor" href="#" 
      className="ti-btn ti-btn-icon ti-btn-sm ti-btn-success-full">
      <i className="ri-download-2-line"></i>
      </Link>
      <Link aria-label="anchor" href="#" className="ti-btn 
      ti-btn-icon ti-btn-sm ti-btn-info-full">
      <i className="ri-edit-line"></i></Link>
      </div>
      </td>
      </tr>
      <tr className="border-b border-defaultborder">
      <th scope="row"><input className="form-check-input" 
      type="checkbox" id="checkboxNoLabel3" value="" aria-label="..." /></th>
      <td>
      <div className="flex items-center">
      <span className="avatar avatar-xs me-2 online avatar-rounded">
      <img src="../../assets/images/faces/14.jpg" alt="img" />
      </span>Simon Cowel</div></td><td>Service Manager</td>
      <td>
      <span className="badge bg-success/10 text-success">
      Manager</span>
      </td>
      <td>simoncowel234@gmail.com</td>
      <td><div className="avatar-list-stacked">
      <span className="avatar avatar-sm avatar-rounded">
      <img src="../../assets/images/faces/6.jpg" alt="img" />
      </span><span className="avatar avatar-sm avatar-rounded">
      <img src="../../assets/images/faces/16.jpg" alt="img" />
      </span>
      <Link className="avatar avatar-sm bg-primary text-white
      avatar-rounded" href="#">+10</Link>
      </div>
      </td>
      <td><div className="progress progress-xs">
      <div className="progress-bar bg-primary w-[45%]"
      aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
      </div></div></td><td>&#36;7,123.21</td>
      <td><div className="hstack flex gap-3 text-[.9375rem]">
      <Link aria-label="anchor" href="#" 
      className="ti-btn ti-btn-icon ti-btn-sm ti-btn-success-full">
      <i className="ri-download-2-line"></i></Link>
      <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon 
      ti-btn-sm ti-btn-info-full"><i className="ri-edit-line"></i></Link>
      </div></td></tr><tr className="border-b border-defaultborder">
      <th scope="row"><input className="form-check-input" type="checkbox"
      id="checkboxNoLabel13" value="" aria-label="..." /></th>
      <td><div className="flex items-center"><span className="avatar avatar-xs me-2 
        online avatar-rounded"><img src="../../assets/images/faces/5.jpg" alt="img" />
        </span>Mirinda Hers</div></td><td>Recruiter</td><td>
        <span className="badge bg-danger/10 text-danger">Employee</span></td>
        <td>mirindahers@gmail.com</td><td><div className="avatar-list-stacked">
        <span className="avatar avatar-sm avatar-rounded">
        <img src="../../assets/images/faces/3.jpg" alt="img" />
        </span><span className="avatar avatar-sm avatar-rounded">
        <img src="../../assets/images/faces/10.jpg" alt="img" />
        </span><span className="avatar avatar-sm avatar-rounded">
        <img src="../../assets/images/faces/14.jpg" alt="img" /></span>
        <Link className="avatar avatar-sm bg-primary text-white avatar-rounded"
        href="#">+6
        </Link>
        </div>
        </td>
        <td>
        <div className="progress progress-xs">
        <div className="progress-bar bg-primary w-[21%]" aria-valuenow="21" 
        aria-valuemin="0" aria-valuemax="100"></div></div></td><td>&#36;2,325.45
        </td><td><div className="hstack flex gap-3 text-[.9375rem]">
        <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon ti-btn-sm 
        ti-btn-success-full"><i className="ri-download-2-line"></i></Link>
        <Link aria-label="anchor" href="#" className="ti-btn ti-btn-icon ti-btn-sm
          ti-btn-info-full"><i className="ri-edit-line"></i>
          </Link>
          </div>
          </td>
          </tr>
    </tbody>
    </table>
</div>
// End Prism Code//`,Q=`//<!-- Prism Code: This code is only used for showcode purpose -->//
<div className="table-responsive">
<table className="table align-middle min-w-full">
<thead>
    <tr className="border-b border-defaultborder">
    <th scope="col" className="w-[25%] text-start">Heading 1</th>
    <th scope="col" className="w-[25%] text-start">Heading 2</th>
    <th scope="col" className="w-[25%] text-start">Heading 3</th>
    <th scope="col" className="w-[25%] text-start">Heading 4</th>
    </tr>
</thead>
   <tbody>
      <tr className="border-b border-defaultborder">
      <td>This cell inherits <code>vertical-align: middle;</code> fromthetable</td>
      <td>This cell inherits <code>vertical-align: middle;</code> fromthetable</td>
      <td>This cell inherits <code>vertical-align: middle;</code> fromthetable</td>
      <td>This here is some placeholder text, intended to take upquite abit of 
      vertical space, to demonstrate how the verticalalignmentworks in the preceding
      cells.</td></tr><tr className="align-bottom border-b border-defaultborder">
      <td>This cell inherits <code>vertical-align: bottom;</code> 
      fromthetable row</td><td>This cell inherits <code>vertical-align: 
      bottom;</code> fromthetable row</td><td>This cell inherits <code>
      vertical-align: bottom;</code> fromthetable row</td><td>This here is some placeholder 
      text, intended to take upquite abit of vertical space, to demonstrate how the 
      verticalalignmentworks in the preceding cells.</td></tr><tr className="border-b
        border-defaultborder"><td>This cell inherits <code>vertical-align: middle;</code>
      fromthetable</td><td>This cell inherits <code>vertical-align: middle;</code>
      fromthetable</td><td className="align-top">This cell is aligned to the top.
      </td>
      <td>This here is some placeholder text, intended to take upquite abit of vertical space,
      to demonstrate how the verticalalignmentworks in the preceding cells.</td>
      </tr>
   </tbody>
 </table>
</div>
// End Prism Code//`;a.s(["default",0,()=>(0,b.jsxs)("div",{children:[(0,b.jsx)(i.default,{title:"Tables"}),(0,b.jsx)(h.default,{currentpage:"Tables",activepage:"Tables",mainpage:"Tables"}),(0,b.jsxs)("div",{className:"grid grid-cols-12 gap-6",children:[(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Basic Table",code:l,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Name"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Created On"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Number"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Status"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Mark"}),(0,b.jsx)("td",{children:"21,Dec 2021"}),(0,b.jsx)("td",{children:"+1234-12340"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-outline-primary",children:"Completed"})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Monika"}),(0,b.jsx)("td",{children:"29,April 2022"}),(0,b.jsx)("td",{children:"+1523-12459"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-outline-warning",children:"Failed"})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Madina"}),(0,b.jsx)("td",{children:"30,Nov 2022"}),(0,b.jsx)("td",{children:"+1982-16234"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-outline-success",children:"Successful"})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Bhamako"}),(0,b.jsx)("td",{children:"18,Mar 2022"}),(0,b.jsx)("td",{children:"+1526-10729"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-outline-secondary",children:"Pending"})})]})]})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Bordered Table",code:m,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap table-bordered min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"User"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Status"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Email"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Action"})]})}),(0,b.jsx)("tbody",{children:c.map(a=>(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("span",{className:`avatar avatar-xs me-2 ${a.class1} avatar-rounded`,children:(0,b.jsx)("img",{src:a.src,alt:"img"})}),a.name]})}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:`badge bg-${a.color} text-${a.color1}`,children:a.text})}),(0,b.jsx)("td",{children:a.mail}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"hstack gap-2 flex-wrap",children:[(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"text-info text-[.875rem] leading-none me-1",children:(0,b.jsx)("i",{className:"ri-edit-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"text-danger text-[.875rem] leading-none",children:(0,b.jsx)("i",{className:"ri-delete-bin-5-line"})})]})})]},Math.random()))})]})})})})]}),(0,b.jsxs)("div",{className:"grid grid-cols-12 gap-6",children:[(0,b.jsx)("div",{className:"xl:col-span-4 col-span-12",children:(0,b.jsx)(k.default,{title:"Bordered Primary",code:n,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap table-bordered table-bordered-primary border-primary/10 min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-primary/10",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Order"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Date"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Customer"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Action"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{className:"border-b border-primary/10",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"#0007"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-light text-dark",children:"26-04-2022"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"avatar avatar-xs me-2 online avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/3.jpg",alt:"img"})}),"Mayor Kelly"]})}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-primary/10 text-primary",children:"Booked"})})]}),(0,b.jsxs)("tr",{className:"border-b border-primary/10",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"#0008"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-light text-dark",children:"15-02-2022"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"avatar avatar-xs me-2 online avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/6.jpg",alt:"img"})}),"Wicky Kross"]})}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-primary/10 text-primary",children:"Booked"})})]}),(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"#0009"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-light text-dark",children:"23-05-2022"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"avatar avatar-xs me-2 online avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/1.jpg",alt:"img"})}),"Julia Cam"]})}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-primary/10 text-primary",children:"Booked"})})]})]})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-4 col-span-12",children:(0,b.jsx)(k.default,{title:"Bordered Success",customCardClass:"custom box",code:o,children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap table-bordered table-bordered-success min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-success/10",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Order"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Date"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Customer"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Status"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{className:"border-b border-success/10",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"#0011"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-light text-dark",children:"07-01-2022"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"avatar avatar-xs me-2 online avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/10.jpg",alt:"img"})}),"Helsenky"]})}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-success/10 text-success",children:"Delivered"})})]}),(0,b.jsxs)("tr",{className:"border-b border-success/10",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"#0012"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-light text-dark",children:"18-05-2022"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"avatar avatar-xs me-2 online avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/14.jpg",alt:"img"})}),"Brodus"]})}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-success/10 text-success",children:"Delivered"})})]}),(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"#0013"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-light text-dark",children:"19-03-2022"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"avatar avatar-xs me-2 online avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/12.jpg",alt:"img"})}),"Chikka Alen"]})}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-success/10 text-success",children:"Delivered"})})]})]})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-4 col-span-12",children:(0,b.jsx)(k.default,{title:"Bordered Warning",customCardClass:"custom box",code:p,children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap table-bordered table-bordered-warning min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-warning/10",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Order"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Date"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Customer"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Action"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{className:"border-b border-warning/10",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"#0014"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-light text-dark",children:"21-02-2022"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"avatar avatar-xs me-2 online avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/13.jpg",alt:"img"})}),"Sukuro Kim"]})}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-warning/10 text-warning",children:"Accepted"})})]}),(0,b.jsxs)("tr",{className:"border-b border-warning/10",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"#0018"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-light text-dark",children:"26-03-2022"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"avatar avatar-xs me-2 online avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/11.jpg",alt:"img"})}),"Alex Carey"]})}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-warning/10 text-warning",children:"Accepted"})})]}),(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"#0020"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-light text-dark",children:"14-03-2022"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"avatar avatar-xs me-2 online avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/2.jpg",alt:"img"})}),"Pamila Anderson"]})}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-warning/10 text-warning",children:"Accepted"})})]})]})]})})})})]}),(0,b.jsxs)("div",{className:"grid grid-cols-12 gap-6",children:[(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Table Without Borders",customCardClass:"custom box",code:q,children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap table-borderless min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"User Name"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Transaction Id"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Created"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Status"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Harshrath"}),(0,b.jsx)("td",{children:"#5182-3467"}),(0,b.jsx)("td",{children:"24 May 2022"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-primary text-white",children:"Fixed"})})]}),(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Zozo Hadid"}),(0,b.jsx)("td",{children:"#5182-3412"}),(0,b.jsx)("td",{children:"02 July 2022"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-warning  text-white",children:"In Progress"})})]}),(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Martiana"}),(0,b.jsx)("td",{children:"#5182-3423"}),(0,b.jsx)("td",{children:"15 April 2022"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-success  text-white",children:"Completed"})})]}),(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Alex Carey"}),(0,b.jsx)("td",{children:"#5182-3456"}),(0,b.jsx)("td",{children:"17 March 2022"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-danger  text-white",children:"Pending"})})]})]})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Table Group Divideres",code:r,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap min-w-full ",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Product"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Seller"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Sale Percentage"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Qunatity Sold"})]})}),(0,b.jsxs)("tbody",{className:"table-group-divider dark:border-defaultborder/10",children:[(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Smart Watch"}),(0,b.jsx)("td",{children:"Slowtrack.inc"}),(0,b.jsx)("td",{children:(0,b.jsxs)(j.default,{href:"#!",scroll:!1,className:"text-success",children:["24.23%",(0,b.jsx)("i",{className:"ri-arrow-up-fill ms-1"})]})}),(0,b.jsx)("td",{children:"250/1786"})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"White Sneakers"}),(0,b.jsx)("td",{children:"American & Co.inc"}),(0,b.jsx)("td",{children:(0,b.jsxs)(j.default,{href:"#!",scroll:!1,className:"text-danger",children:["12.45%",(0,b.jsx)("i",{className:"ri-arrow-down-fill ms-1"})]})}),(0,b.jsx)("td",{children:"123/985"})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Baseball Bat"}),(0,b.jsx)("td",{children:"Sports Company"}),(0,b.jsx)("td",{children:(0,b.jsxs)(j.default,{href:"#!",scroll:!1,className:"text-success",children:["06.64%",(0,b.jsx)("i",{className:"ri-arrow-up-fill ms-1"})]})}),(0,b.jsx)("td",{children:"124/232"})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Black Hoodie"}),(0,b.jsx)("td",{children:"Renonds Fabrics"}),(0,b.jsx)("td",{children:(0,b.jsxs)(j.default,{href:"#!",scroll:!1,className:"text-success",children:["14.42%",(0,b.jsx)("i",{className:"ri-arrow-up-fill ms-1"})]})}),(0,b.jsx)("td",{children:"192/2456"})]})]})]})})})})]}),(0,b.jsxs)("div",{className:"grid grid-cols-12 gap-6",children:[(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Stripped Rows",code:s,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap ti-striped-table min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"ID"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Date"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Customer"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Action"})]})}),(0,b.jsx)("tbody",{children:d.map(a=>(0,b.jsxs)("tr",{className:"border-b border-defaultborder ",children:[(0,b.jsx)("th",{scope:"row",children:a.order}),(0,b.jsx)("td",{children:a.date}),(0,b.jsx)("td",{children:a.name}),(0,b.jsx)("td",{children:(0,b.jsxs)("button",{type:"button",className:"ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-success-full btn-wave",children:[(0,b.jsx)("i",{className:"ri-download-2-line align-middle me-2 inline-block"}),"Download"]})})]},Math.random()))})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Stripped Columns",code:t,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap table-striped-columns min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"ID"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Date"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Customer"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Action"})]})}),(0,b.jsx)("tbody",{children:d.map(a=>(0,b.jsxs)("tr",{className:"border-b border-defaultborder ",children:[(0,b.jsx)("th",{scope:"row",children:a.order}),(0,b.jsx)("td",{children:a.date}),(0,b.jsx)("td",{children:a.name}),(0,b.jsx)("td",{children:(0,b.jsxs)("button",{type:"button",className:"ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-danger-full btn-wave",children:[(0,b.jsx)("i",{className:"ri-delete-bin-line align-middle me-2 d-inline-block"}),"Delete"]})})]},Math.random()))})]})})})})]}),(0,b.jsxs)("div",{className:"grid grid-cols-12 gap-6",children:[(0,b.jsx)("div",{className:"xl:col-span-4 col-span-12",children:(0,b.jsx)(k.default,{title:"Primary Table",code:u,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap table-primary !rounded-none min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-primary/10",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"#"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"First"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Last"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Handle"})]})}),(0,b.jsx)("tbody",{children:e.map(a=>(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:a.id}),(0,b.jsx)("td",{children:a.text1}),(0,b.jsx)("td",{children:a.text2}),(0,b.jsx)("td",{children:a.text3})]},Math.random()))})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-4 col-span-12",children:(0,b.jsx)(k.default,{title:"Secondary Table",code:v,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap table-secondary  !rounded-none min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-secondary/10",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"#"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"First"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Last"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Handle"})]})}),(0,b.jsx)("tbody",{children:e.map(a=>(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:a.id}),(0,b.jsx)("td",{children:a.text1}),(0,b.jsx)("td",{children:a.text2}),(0,b.jsx)("td",{children:a.text3})]},Math.random()))})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-4 col-span-12",children:(0,b.jsx)(k.default,{title:"Warning Table",code:w,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap table-warning  !rounded-none min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-warning/10",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"#"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"First"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Last"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Handle"})]})}),(0,b.jsx)("tbody",{children:e.map(a=>(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:a.id}),(0,b.jsx)("td",{children:a.text1}),(0,b.jsx)("td",{children:a.text2}),(0,b.jsx)("td",{children:a.text3})]},Math.random()))})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-4 col-span-12",children:(0,b.jsx)(k.default,{title:"Danger Table",code:x,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap table-danger  !rounded-none min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-danger/10",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"#"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"First"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Last"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Handle"})]})}),(0,b.jsx)("tbody",{children:e.map(a=>(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:a.id}),(0,b.jsx)("td",{children:a.text1}),(0,b.jsx)("td",{children:a.text2}),(0,b.jsx)("td",{children:a.text3})]},Math.random()))})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-4 col-span-12",children:(0,b.jsx)(k.default,{title:"Dark Table",code:y,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap table-dark !rounded-none min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-black/10 dark:border-black/[0.025];",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"#"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"First"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Last"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Handle"})]})}),(0,b.jsx)("tbody",{children:e.map(a=>(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:a.id}),(0,b.jsx)("td",{children:a.text1}),(0,b.jsx)("td",{children:a.text2}),(0,b.jsx)("td",{children:a.text3})]},Math.random()))})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-4 col-span-12",children:(0,b.jsx)(k.default,{title:"Success Table With stripped Rows",code:z,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap table-success table-striped  !rounded-none min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-success/10",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"#"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"First"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Last"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Handle"})]})}),(0,b.jsx)("tbody",{children:e.map(a=>(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:a.id}),(0,b.jsx)("td",{children:a.text1}),(0,b.jsx)("td",{children:a.text2}),(0,b.jsx)("td",{children:a.text3})]},Math.random()))})]})})})})]}),(0,b.jsxs)("div",{className:"grid grid-cols-12 gap-6",children:[(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Hoverable Rows",code:A,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap table-hover min-w-full ti-custom-table-hover",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Product Manager"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Category"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Team"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Status"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{className:"border-b border-defaultborder ",children:[(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("div",{className:"avatar avatar-sm me-2 avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/10.jpg",alt:"img"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"leading-none",children:(0,b.jsx)("span",{children:"Joanna Smith"})}),(0,b.jsx)("div",{className:"leading-none",children:(0,b.jsx)("span",{className:"text-[0.6875rem] text-[#8c9097] dark:text-white/50",children:"joannasmith14@gmail.com"})})]})]})}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-primary/10 text-primary",children:"Fashion"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"avatar-list-stacked",children:[(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/2.jpg",alt:"img"})}),(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/8.jpg",alt:"img"})}),(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/2.jpg",alt:"img"})}),(0,b.jsx)(j.default,{className:"avatar avatar-sm bg-primary text-white avatar-rounded",href:"#!",scroll:!1,children:"+5"})]})}),(0,b.jsx)("td",{children:(0,b.jsx)("div",{className:"progress progress-xs",children:(0,b.jsx)("div",{className:"progress-bar bg-primary w-[52%]",role:"progressbar","aria-valuenow":52,"aria-valuemin":0,"aria-valuemax":100})})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder ",children:[(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("div",{className:"avatar avatar-sm me-2 avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/2.jpg",alt:"img"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"leading-none",children:(0,b.jsx)("span",{children:"Kara Kova"})}),(0,b.jsx)("div",{className:"leading-none",children:(0,b.jsx)("span",{className:"text-[0.6875rem] text-[#8c9097] dark:text-white/50",children:"milesakara@gmail.com"})})]})]})}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-warning/10 text-warning",children:"Clothing"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"avatar-list-stacked",children:[(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/4.jpg",alt:"img"})}),(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/6.jpg",alt:"img"})}),(0,b.jsx)(j.default,{className:"avatar avatar-sm bg-primary text-white avatar-rounded",href:"#!",scroll:!1,children:"+6"})]})}),(0,b.jsx)("td",{children:(0,b.jsx)("div",{className:"progress progress-xs",children:(0,b.jsx)("div",{className:"progress-bar bg-primary w-2/5",role:"progressbar","aria-valuenow":40,"aria-valuemin":0,"aria-valuemax":100})})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder ",children:[(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("div",{className:"avatar avatar-sm me-2 avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/16.jpg",alt:"img"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"leading-none",children:(0,b.jsx)("span",{children:"Donald Trimb"})}),(0,b.jsx)("div",{className:"leading-none",children:(0,b.jsx)("span",{className:"text-[0.6875rem] text-[#8c9097] dark:text-white/50",children:"donaldo21@gmail.com"})})]})]})}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-dark/10 text-black dark:text-white",children:"Electronics"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"avatar-list-stacked",children:[(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/1.jpg",alt:"img"})}),(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/11.jpg",alt:"img"})}),(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/15.jpg",alt:"img"})}),(0,b.jsx)(j.default,{className:"avatar avatar-sm bg-primary text-white avatar-rounded",href:"#!",scroll:!1,children:"+2"})]})}),(0,b.jsx)("td",{children:(0,b.jsx)("div",{className:"progress progress-xs",children:(0,b.jsx)("div",{className:"progress-bar bg-primary w-[17%]",role:"progressbar","aria-valuenow":17,"aria-valuemin":0,"aria-valuemax":100})})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder ",children:[(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("div",{className:"avatar avatar-sm me-2 avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/13.jpg",alt:"img"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"leading-none",children:(0,b.jsx)("span",{children:"Justin Gaethje"})}),(0,b.jsx)("div",{className:"leading-none",children:(0,b.jsx)("span",{className:"text-[0.6875rem] text-[#8c9097] dark:text-white/50",children:"justingae@gmail.com"})})]})]})}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-danger/10 text-danger",children:"Sports"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"avatar-list-stacked",children:[(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/4.jpg",alt:"img"})}),(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/6.jpg",alt:"img"})}),(0,b.jsx)(j.default,{className:"avatar avatar-sm bg-primary text-white avatar-rounded",href:"#!",scroll:!1,children:"+5"})]})}),(0,b.jsx)("td",{children:(0,b.jsx)("div",{className:"progress progress-xs",children:(0,b.jsx)("div",{className:"progress-bar bg-primary w-[72%]",role:"progressbar","aria-valuenow":72,"aria-valuemin":0,"aria-valuemax":100})})})]})]})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Hoverable Rows With stripped Rows",code:B,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap ti-striped-table table-hover min-w-full ti-custom-table-hover",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder ",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Invoice"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Customer"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Status"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Date"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{className:"border-b border-defaultborder ",children:[(0,b.jsx)("th",{scope:"row",children:"IN-2032"}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("div",{className:"avatar avatar-sm me-2 avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/15.jpg",alt:"img"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"leading-none",children:(0,b.jsx)("span",{children:"Mark Cruise"})}),(0,b.jsx)("div",{className:"leading-none",children:(0,b.jsx)("span",{className:"text-[0.6875rem] text-[#8c9097] dark:text-white/50",children:"markcruise24@gmail.com"})})]})]})}),(0,b.jsx)("td",{children:(0,b.jsxs)("span",{className:"badge bg-success/10 text-success",children:[(0,b.jsx)("i",{className:"ri-check-fill align-middle me-1"}),"Paid"]})}),(0,b.jsx)("td",{children:"Jul 26,2022"})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder ",children:[(0,b.jsx)("th",{scope:"row",children:"IN-2022"}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("div",{className:"avatar avatar-sm me-2 avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/12.jpg",alt:"img"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"leading-none",children:(0,b.jsx)("span",{children:"Charanjeep"})}),(0,b.jsx)("div",{className:"leading-none",children:(0,b.jsx)("span",{className:"text-[0.6875rem] text-[#8c9097] dark:text-white/50",children:"charanjeep@gmail.in"})})]})]})}),(0,b.jsx)("td",{children:(0,b.jsxs)("span",{className:"badge bg-success/10 text-success",children:[(0,b.jsx)("i",{className:"ri-check-fill align-middle me-1"}),"Paid"]})}),(0,b.jsx)("td",{children:"Mar 14,2022"})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder ",children:[(0,b.jsx)("th",{scope:"row",children:"IN-2014"}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("div",{className:"avatar avatar-sm me-2 avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/5.jpg",alt:"img"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"leading-none",children:(0,b.jsx)("span",{children:"Samantha Julie"})}),(0,b.jsx)("div",{className:"leading-none",children:(0,b.jsx)("span",{className:"text-[0.6875rem] text-[#8c9097] dark:text-white/50",children:"julie453@gmail.com"})})]})]})}),(0,b.jsx)("td",{children:(0,b.jsxs)("span",{className:"badge bg-danger/10 text-danger",children:[(0,b.jsx)("i",{className:"ri-close-fill align-middle me-1"}),"Cancelled"]})}),(0,b.jsx)("td",{children:"Feb 1,2022"})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder ",children:[(0,b.jsx)("th",{scope:"row",children:"IN-2036"}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("div",{className:"avatar avatar-sm me-2 avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/11.jpg",alt:"img"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"leading-none",children:(0,b.jsx)("span",{children:"Simon Cohen"})}),(0,b.jsx)("div",{className:"leading-none",children:(0,b.jsx)("span",{className:"text-[0.6875rem] text-[#8c9097] dark:text-white/50",children:"simon@gmail.com"})})]})]})}),(0,b.jsx)("td",{children:(0,b.jsxs)("span",{className:"badge bg-light text-black dark:text-white",children:[(0,b.jsx)("i",{className:"ri-reply-line align-middle me-1"}),"Refunded"]})}),(0,b.jsx)("td",{children:"Apr 24,2022"})]})]})]})})})})]}),(0,b.jsxs)("div",{className:"grid grid-cols-12 gap-6",children:[(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Table Head Primary",code:C,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap min-w-full",children:[(0,b.jsx)("thead",{className:"bg-primary/10",children:(0,b.jsxs)("tr",{className:"border-b border-primary/10",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"User Name"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Transaction Id"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Created"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Status"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{className:"border-b border-primary/10",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Harshrath"}),(0,b.jsx)("td",{children:"#5182-3467"}),(0,b.jsx)("td",{children:"24 May 2022"}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"hstack flex gap-3 text-[.9375rem]",children:[(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-sm ti-btn-success !rounded-full",children:(0,b.jsx)("i",{className:"ri-download-2-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-sm ti-btn-info !rounded-full",children:(0,b.jsx)("i",{className:"ri-edit-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-sm ti-btn-danger !rounded-full",children:(0,b.jsx)("i",{className:"ri-delete-bin-line"})})]})})]}),(0,b.jsxs)("tr",{className:"border-b border-primary/10",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Zozo Hadid"}),(0,b.jsx)("td",{children:"#5182-3412"}),(0,b.jsx)("td",{children:"02 July 2022"}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"hstack flex gap-3 text-[.9375rem]",children:[(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-sm ti-btn-success !rounded-full",children:(0,b.jsx)("i",{className:"ri-download-2-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-sm ti-btn-info !rounded-full",children:(0,b.jsx)("i",{className:"ri-edit-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-sm ti-btn-danger !rounded-full",children:(0,b.jsx)("i",{className:"ri-delete-bin-line"})})]})})]}),(0,b.jsxs)("tr",{className:"border-b border-primary/10",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Martiana"}),(0,b.jsx)("td",{children:"#5182-3423"}),(0,b.jsx)("td",{children:"15 April 2022"}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"hstack flex gap-3 text-[.9375rem]",children:[(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-sm ti-btn-success !rounded-full",children:(0,b.jsx)("i",{className:"ri-download-2-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-sm ti-btn-info !rounded-full",children:(0,b.jsx)("i",{className:"ri-edit-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-sm ti-btn-danger !rounded-full",children:(0,b.jsx)("i",{className:"ri-delete-bin-line"})})]})})]}),(0,b.jsxs)("tr",{className:"border-b border-primary/10",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Alex Carey"}),(0,b.jsx)("td",{children:"#5182-3456"}),(0,b.jsx)("td",{children:"17 March 2022"}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"hstack flex gap-3 text-[.9375rem]",children:[(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-sm ti-btn-success !rounded-full",children:(0,b.jsx)("i",{className:"ri-download-2-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-sm ti-btn-info !rounded-full",children:(0,b.jsx)("i",{className:"ri-edit-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-sm ti-btn-danger !rounded-full",children:(0,b.jsx)("i",{className:"ri-delete-bin-line"})})]})})]})]})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Table Head Warning",code:D,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap min-w-full",children:[(0,b.jsx)("thead",{className:"bg-warning/10",children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"User Name"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Transaction Id"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Created"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Status"})]})}),(0,b.jsx)("tbody",{children:f.map(a=>(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:a.name}),(0,b.jsx)("td",{children:a.text}),(0,b.jsx)("td",{children:a.date}),(0,b.jsx)("td",{children:(0,b.jsx)("button",{type:"button",className:`ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-${a.color}`,children:a.btn})})]},Math.random()))})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Table Head Success",code:E,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap min-w-full",children:[(0,b.jsx)("thead",{className:"bg-success/10",children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"User Name"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Transaction Id"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Created"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Status"})]})}),(0,b.jsx)("tbody",{children:f.map(a=>(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:a.name}),(0,b.jsx)("td",{children:a.text}),(0,b.jsx)("td",{children:a.date}),(0,b.jsx)("td",{children:(0,b.jsx)("button",{type:"button",className:`ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-${a.color}`,children:a.btn})})]},Math.random()))})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Table Head Info",code:F,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap min-w-full",children:[(0,b.jsx)("thead",{className:"bg-info/10",children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"User Name"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Transaction Id"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Created"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Status"})]})}),(0,b.jsx)("tbody",{children:f.map(a=>(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:a.name}),(0,b.jsx)("td",{children:a.text}),(0,b.jsx)("td",{children:a.date}),(0,b.jsx)("td",{children:(0,b.jsx)("button",{type:"button",className:`ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-${a.color}`,children:a.btn})})]},Math.random()))})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Table Head Secondary",code:G,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive ",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap min-w-full",children:[(0,b.jsx)("thead",{className:"bg-secondary/10",children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"User Name"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Transaction Id"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Created"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Status"})]})}),(0,b.jsx)("tbody",{children:f.map(a=>(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:a.name}),(0,b.jsx)("td",{children:a.text}),(0,b.jsx)("td",{children:a.date}),(0,b.jsx)("td",{children:(0,b.jsx)("button",{type:"button",className:`ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-${a.color}`,children:a.btn})})]},Math.random()))})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Table Head Danger",code:H,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap min-w-full",children:[(0,b.jsx)("thead",{className:"bg-danger/10",children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"User Name"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Transaction Id"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Created"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Status"})]})}),(0,b.jsx)("tbody",{children:f.map(a=>(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:a.name}),(0,b.jsx)("td",{children:a.text}),(0,b.jsx)("td",{children:a.date}),(0,b.jsx)("td",{children:(0,b.jsx)("button",{type:"button",className:`ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-${a.color}`,children:a.btn})})]},Math.random()))})]})})})})]}),(0,b.jsxs)("div",{className:"grid grid-cols-12 gap-6",children:[(0,b.jsx)("div",{className:"xl:col-span-4 col-span-12",children:(0,b.jsx)(k.default,{title:"Table Foot",code:I,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap min-w-full",children:[(0,b.jsx)("thead",{className:"bg-primary/10",children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",children:"S.No"}),(0,b.jsx)("th",{scope:"col",children:"Team"}),(0,b.jsx)("th",{scope:"col",children:"Matches Won"}),(0,b.jsx)("th",{scope:"col",children:"Win Ratio"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",children:"01"}),(0,b.jsx)("td",{children:"Manchester"}),(0,b.jsx)("td",{children:"232"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-primary text-white",children:"42%"})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",children:"02"}),(0,b.jsx)("td",{children:"Barcelona"}),(0,b.jsx)("td",{children:"175"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-primary text-white",children:"58%"})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",children:"03"}),(0,b.jsx)("td",{children:"Portugal"}),(0,b.jsx)("td",{children:"126"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-primary text-white",children:"32%"})})]})]}),(0,b.jsx)("tfoot",{className:"bg-primary/10",children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",children:"Total"}),(0,b.jsx)("td",{children:"United States"}),(0,b.jsx)("td",{children:"558"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-primary text-white",children:"56%"})})]})})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-4 col-span-12",children:(0,b.jsx)(k.default,{title:"Table With Caption",code:J,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap min-w-full caption-bottom",children:[(0,b.jsx)("caption",{children:"Top 3 Countries"}),(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"S.No"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Country"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Medals Won"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"No Of Athletes"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"01"}),(0,b.jsx)("td",{children:"United States"}),(0,b.jsxs)("td",{children:["2012",(0,b.jsx)("i",{className:"ri-medal-line mx-2"})]}),(0,b.jsx)("td",{children:"1823"})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"02"}),(0,b.jsx)("td",{children:"United Kingdom"}),(0,b.jsxs)("td",{children:["1012",(0,b.jsx)("i",{className:"ri-medal-line mx-2"})]}),(0,b.jsx)("td",{children:"992"})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"03"}),(0,b.jsx)("td",{children:"Germany"}),(0,b.jsxs)("td",{children:["914",(0,b.jsx)("i",{className:"ri-medal-line mx-2"})]}),(0,b.jsx)("td",{children:"875"})]})]})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-4 col-span-12",children:(0,b.jsx)(k.default,{title:"Table With Top Caption",code:K,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap caption-top w-full",children:[(0,b.jsx)("caption",{children:"Top IT Companies"}),(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",children:"S.No"}),(0,b.jsx)("th",{scope:"col",children:"Name"}),(0,b.jsx)("th",{scope:"col",children:"Revenue"}),(0,b.jsx)("th",{scope:"col",children:"Country"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",children:"1"}),(0,b.jsx)("td",{children:"Microsoft"}),(0,b.jsx)("td",{children:"$170 billion"}),(0,b.jsx)("td",{children:"United States"})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",children:"2"}),(0,b.jsx)("td",{children:"HP"}),(0,b.jsx)("td",{children:"$72 billion"}),(0,b.jsx)("td",{children:"United States"})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",children:"3"}),(0,b.jsx)("td",{children:"IBM"}),(0,b.jsx)("td",{children:"$60 billion"}),(0,b.jsx)("td",{children:"United States"})]})]})]})})})})]}),(0,b.jsxs)("div",{className:"grid grid-cols-12 gap-6",children:[(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Active Tables",code:L,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Name"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Created On"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Number"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Status"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{className:"table-active",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Mark"}),(0,b.jsx)("td",{children:"21,Dec 2021"}),(0,b.jsx)("td",{children:"+1234-12340"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-primary text-white",children:"Completed"})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Monika"}),(0,b.jsx)("td",{children:"29,April 2022"}),(0,b.jsx)("td",{children:"+1523-12459"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-warning text-white",children:"Failed"})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Madina"}),(0,b.jsx)("td",{children:"30,Nov 2022"}),(0,b.jsx)("td",{className:"table-active",children:"+1982-16234"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-success text-white",children:"Successful"})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"Bhamako"}),(0,b.jsx)("td",{children:"18,Mar 2022"}),(0,b.jsx)("td",{children:"+1526-10729"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-secondary text-white",children:"Pending"})})]})]})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Small Tables",code:M,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap table-sm min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Invoice"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Created Date"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Status"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Action"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:(0,b.jsxs)("div",{className:"form-check",children:[(0,b.jsx)("input",{className:"form-check-input",type:"checkbox",defaultValue:"",id:"checkebox-sm",defaultChecked:!0}),(0,b.jsx)("label",{className:"form-check-label",htmlFor:"checkebox-sm",children:"Zelensky"})]})}),(0,b.jsx)("td",{children:"25-Apr-2021"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-success/10 text-succes",children:"Paid"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"hstack flex gap-3 text-[.9375rem]",children:[(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-light",children:(0,b.jsx)("i",{className:"ri-download-2-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-light",children:(0,b.jsx)("i",{className:"ri-edit-line"})})]})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:(0,b.jsxs)("div",{className:"form-check",children:[(0,b.jsx)("input",{className:"form-check-input",type:"checkbox",defaultValue:"",id:"checkebox-sm1"}),(0,b.jsx)("label",{className:"form-check-label",htmlFor:"checkebox-sm1",children:"Kim Jong"})]})}),(0,b.jsx)("td",{children:"29-April-2022"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-danger/10 text-danger",children:"Pending"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"hstack flex gap-3 text-[.9375rem]",children:[(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-light",children:(0,b.jsx)("i",{className:"ri-download-2-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-light",children:(0,b.jsx)("i",{className:"ri-edit-line"})})]})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:(0,b.jsxs)("div",{className:"form-check",children:[(0,b.jsx)("input",{className:"form-check-input",type:"checkbox",defaultValue:"",id:"checkebox-sm2"}),(0,b.jsx)("label",{className:"form-check-label",htmlFor:"checkebox-sm2",children:"Obana"})]})}),(0,b.jsx)("td",{children:"30-Nov-2022"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-success/10 text-success",children:"Paid"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"hstack flex gap-3 text-[.9375rem]",children:[(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-light",children:(0,b.jsx)("i",{className:"ri-download-2-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-light",children:(0,b.jsx)("i",{className:"ri-edit-line"})})]})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:(0,b.jsxs)("div",{className:"form-check",children:[(0,b.jsx)("input",{className:"form-check-input",type:"checkbox",defaultValue:"",id:"checkebox-sm3"}),(0,b.jsx)("label",{className:"form-check-label",htmlFor:"checkebox-sm3",children:"Sean Paul"})]})}),(0,b.jsx)("td",{children:"01-Jan-2022"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-success/10 text-success",children:"Paid"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"hstack flex gap-3 text-[.9375rem]",children:[(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-light",children:(0,b.jsx)("i",{className:"ri-download-2-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-light",children:(0,b.jsx)("i",{className:"ri-edit-line"})})]})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:(0,b.jsxs)("div",{className:"form-check",children:[(0,b.jsx)("input",{className:"form-check-input",type:"checkbox",defaultValue:"",id:"checkebox-sm4"}),(0,b.jsx)("label",{className:"form-check-label",htmlFor:"checkebox-sm4",children:"Karizma"})]})}),(0,b.jsx)("td",{children:"14-Feb-2022"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-danger/10 text-danger",children:"Pending"})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"hstack flex gap-3 text-[.9375rem]",children:[(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-light",children:(0,b.jsx)("i",{className:"ri-download-2-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-light",children:(0,b.jsx)("i",{className:"ri-edit-line"})})]})})]})]})]})})})})]}),(0,b.jsxs)("div",{className:"grid grid-cols-12 gap-6",children:[(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Color Variant Tables",code:N,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Color"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Client"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"State"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Quantity"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Total Price"})]})}),(0,b.jsx)("tbody",{children:g.map(a=>(0,b.jsxs)("tr",{className:`${a.class1} border-b border-defaultborder`,children:[(0,b.jsx)("th",{scope:"row",children:a.text}),(0,b.jsx)("td",{children:a.name}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:`badge ${a.class2}`,children:"Processed"})}),(0,b.jsx)("td",{children:a.quantity}),(0,b.jsx)("td",{children:a.price})]},Math.random()))})]})})})}),(0,b.jsx)("div",{className:"xl:col-span-6 col-span-12",children:(0,b.jsx)(k.default,{title:"Nesting",code:O,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap table-striped table-bordered min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"#"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"First"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Last"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Handle"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"1"}),(0,b.jsx)("td",{children:"Mark"}),(0,b.jsx)("td",{children:"Otto"}),(0,b.jsx)("td",{children:"@mdo"})]}),(0,b.jsx)("tr",{className:"border-b border-defaultborder",children:(0,b.jsx)("td",{colSpan:4,children:(0,b.jsxs)("table",{className:"table whitespace-nowrap mb-0 min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Alphabets"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Users"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Email"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"A"}),(0,b.jsx)("td",{children:"Dino King"}),(0,b.jsx)("td",{children:"dinoking231@gmail.com"})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"B"}),(0,b.jsx)("td",{children:"Poppins sams"}),(0,b.jsx)("td",{children:"pops@gmail.com"})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"C"}),(0,b.jsx)("td",{children:"Brian Shaw"}),(0,b.jsx)("td",{children:"swanbrian@gmail.com"})]})]})]})})}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"3"}),(0,b.jsx)("td",{children:"Larry"}),(0,b.jsx)("td",{children:"the Bird"}),(0,b.jsx)("td",{children:"@twitter"})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"4"}),(0,b.jsx)("td",{children:"Jimmy"}),(0,b.jsx)("td",{children:"the Ostrich"}),(0,b.jsx)("td",{children:"Dummy Text"})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",className:"text-start",children:"5"}),(0,b.jsx)("td",{children:"Cobra Kai"}),(0,b.jsx)("td",{children:"the Snake"}),(0,b.jsx)("td",{children:"Another Name"})]})]})]})})})})]}),(0,b.jsx)("div",{className:"grid grid-cols-12 gap-6",children:(0,b.jsx)("div",{className:"xl:col-span-12 col-span-12",children:(0,b.jsx)(k.default,{title:"Always Responsive",code:P,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table whitespace-nowrap min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",children:(0,b.jsx)("input",{className:"form-check-input",type:"checkbox",id:"checkboxNoLabel",defaultValue:"","aria-label":"..."})}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Team Head"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Category"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Role"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Gmail"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Team"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Work Progress"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Revenue"}),(0,b.jsx)("th",{scope:"col",className:"text-start",children:"Action"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",children:(0,b.jsx)("input",{className:"form-check-input",type:"checkbox",id:"checkboxNoLabel1",defaultValue:"","aria-label":"..."})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"avatar avatar-xs me-2 online avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/3.jpg",alt:"img"})}),"Mayor Kelly"]})}),(0,b.jsx)("td",{children:"Manufacturer"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-primary/10 text-primary",children:"Team Lead"})}),(0,b.jsx)("td",{children:"mayorkrlly@gmail.com"}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"avatar-list-stacked",children:[(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/2.jpg",alt:"img"})}),(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/8.jpg",alt:"img"})}),(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/2.jpg",alt:"img"})}),(0,b.jsx)(j.default,{className:"avatar avatar-sm bg-primary text-white avatar-rounded",href:"#!",scroll:!1,children:"+4"})]})}),(0,b.jsx)("td",{children:(0,b.jsx)("div",{className:"progress progress-xs",children:(0,b.jsx)("div",{className:"progress-bar bg-primary w-[52%]",role:"progressbar","aria-valuenow":52,"aria-valuemin":0,"aria-valuemax":100})})}),(0,b.jsx)("td",{children:"$10,984.29"}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"hstack flex gap-3 text-[.9375rem]",children:[(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-success-full",children:(0,b.jsx)("i",{className:"ri-download-2-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-info-full",children:(0,b.jsx)("i",{className:"ri-edit-line"})})]})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",children:(0,b.jsx)("input",{className:"form-check-input",type:"checkbox",defaultValue:"","aria-label":"..."})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"avatar avatar-xs me-2 online avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/12.jpg",alt:"img"})}),"Andrew Garfield"]})}),(0,b.jsx)("td",{children:"Managing Director"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-warning/10 text-warning",children:"Director"})}),(0,b.jsx)("td",{children:"andrewgarfield@gmail.com"}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"avatar-list-stacked",children:[(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/1.jpg",alt:"img"})}),(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/5.jpg",alt:"img"})}),(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/11.jpg",alt:"img"})}),(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/15.jpg",alt:"img"})}),(0,b.jsx)(j.default,{className:"avatar avatar-sm bg-primary text-white avatar-rounded",href:"#!",scroll:!1,children:"+4"})]})}),(0,b.jsx)("td",{children:(0,b.jsx)("div",{className:"progress progress-xs",children:(0,b.jsx)("div",{className:"progress-bar bg-primary w-[91%]",role:"progressbar","aria-valuenow":91,"aria-valuemin":0,"aria-valuemax":100})})}),(0,b.jsx)("td",{children:"$1.4billion"}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"hstack flex gap-3 text-[.9375rem]",children:[(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-success-full",children:(0,b.jsx)("i",{className:"ri-download-2-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-info-full",children:(0,b.jsx)("i",{className:"ri-edit-line"})})]})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",children:(0,b.jsx)("input",{className:"form-check-input",type:"checkbox",id:"checkboxNoLabel3",defaultValue:"","aria-label":"..."})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"avatar avatar-xs me-2 online avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/14.jpg",alt:"img"})}),"Simon Cowel"]})}),(0,b.jsx)("td",{children:"Service Manager"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-success/10 text-success",children:"Manager"})}),(0,b.jsx)("td",{children:"simoncowel234@gmail.com"}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"avatar-list-stacked",children:[(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/6.jpg",alt:"img"})}),(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/16.jpg",alt:"img"})}),(0,b.jsx)(j.default,{className:"avatar avatar-sm bg-primary text-white avatar-rounded",href:"#!",scroll:!1,children:"+10"})]})}),(0,b.jsx)("td",{children:(0,b.jsx)("div",{className:"progress progress-xs",children:(0,b.jsx)("div",{className:"progress-bar bg-primary w-[45%]",role:"progressbar","aria-valuenow":45,"aria-valuemin":0,"aria-valuemax":100})})}),(0,b.jsx)("td",{children:"$7,123.21"}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"hstack flex gap-3 text-[.9375rem]",children:[(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-success-full",children:(0,b.jsx)("i",{className:"ri-download-2-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-info-full",children:(0,b.jsx)("i",{className:"ri-edit-line"})})]})})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"row",children:(0,b.jsx)("input",{className:"form-check-input",type:"checkbox",id:"checkboxNoLabel13",defaultValue:"","aria-label":"..."})}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"avatar avatar-xs me-2 online avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/5.jpg",alt:"img"})}),"Mirinda Hers"]})}),(0,b.jsx)("td",{children:"Recruiter"}),(0,b.jsx)("td",{children:(0,b.jsx)("span",{className:"badge bg-danger/10 text-danger",children:"Employee"})}),(0,b.jsx)("td",{children:"mirindahers@gmail.com"}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"avatar-list-stacked",children:[(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/3.jpg",alt:"img"})}),(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/10.jpg",alt:"img"})}),(0,b.jsx)("span",{className:"avatar avatar-sm avatar-rounded",children:(0,b.jsx)("img",{src:"../../assets/images/faces/14.jpg",alt:"img"})}),(0,b.jsx)(j.default,{className:"avatar avatar-sm bg-primary text-white avatar-rounded",href:"#!",scroll:!1,children:"+6"})]})}),(0,b.jsx)("td",{children:(0,b.jsx)("div",{className:"progress progress-xs",children:(0,b.jsx)("div",{className:"progress-bar bg-primary w-[21%]",role:"progressbar","aria-valuenow":21,"aria-valuemin":0,"aria-valuemax":100})})}),(0,b.jsx)("td",{children:"$2,325.45"}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:"hstack flex gap-3 text-[.9375rem]",children:[(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-success-full",children:(0,b.jsx)("i",{className:"ri-download-2-line"})}),(0,b.jsx)(j.default,{"aria-label":"anchor",href:"#!",scroll:!1,className:"ti-btn ti-btn-icon ti-btn-sm ti-btn-info-full",children:(0,b.jsx)("i",{className:"ri-edit-line"})})]})})]})]})]})})})})}),(0,b.jsx)("div",{className:"grid grid-cols-12 gap-6",children:(0,b.jsx)("div",{className:"xl:col-span-12 col-span-12",children:(0,b.jsx)(k.default,{title:"Vertical Alignment",code:Q,customCardClass:"custom box",children:(0,b.jsx)("div",{className:"table-responsive",children:(0,b.jsxs)("table",{className:"table align-middle min-w-full",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsx)("th",{scope:"col",className:"w-[25%] text-start",children:"Heading 1"}),(0,b.jsx)("th",{scope:"col",className:"w-[25%] text-start",children:"Heading 2"}),(0,b.jsx)("th",{scope:"col",className:"w-[25%] text-start",children:"Heading 3"}),(0,b.jsx)("th",{scope:"col",className:"w-[25%] text-start",children:"Heading 4"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsxs)("td",{children:["This cell inherits ",(0,b.jsx)("code",{children:"vertical-align: middle;"})," from the table"]}),(0,b.jsxs)("td",{children:["This cell inherits ",(0,b.jsx)("code",{children:"vertical-align: middle;"})," from the table"]}),(0,b.jsxs)("td",{children:["This cell inherits ",(0,b.jsx)("code",{children:"vertical-align: middle;"})," from the table"]}),(0,b.jsx)("td",{children:"This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works in the preceding cells."})]}),(0,b.jsxs)("tr",{className:"align-bottom border-b border-defaultborder",children:[(0,b.jsxs)("td",{children:["This cell inherits ",(0,b.jsx)("code",{children:"vertical-align: bottom;"})," from the table row"]}),(0,b.jsxs)("td",{children:["This cell inherits ",(0,b.jsx)("code",{children:"vertical-align: bottom;"})," from the table row"]}),(0,b.jsxs)("td",{children:["This cell inherits ",(0,b.jsx)("code",{children:"vertical-align: bottom;"})," from the table row"]}),(0,b.jsx)("td",{children:"This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works in the preceding cells."})]}),(0,b.jsxs)("tr",{className:"border-b border-defaultborder",children:[(0,b.jsxs)("td",{children:["This cell inherits ",(0,b.jsx)("code",{children:"vertical-align: middle;"})," from the table"]}),(0,b.jsxs)("td",{children:["This cell inherits ",(0,b.jsx)("code",{children:"vertical-align: middle;"})," from the table"]}),(0,b.jsx)("td",{className:"align-top",children:"This cell is aligned to the top."}),(0,b.jsx)("td",{children:"This here is some placeholder text, intended to take up quite a bit of vertical space, to demonstrate how the vertical alignment works in the preceding cells."})]})]})]})})})})})]})],864497)}];

//# sourceMappingURL=f2fd1_boilerplate_app_%28components%29_%28contentlayout%29_tables_table_page_tsx_5e24f90e._.js.map