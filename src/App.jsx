import { useState, useRef } from "react";

/* ══════════════════════════════════════════════════
   COLORS
══════════════════════════════════════════════════ */
const C={green:"#2E9B3E",blue:"#1565C0",yellow:"#F9A825",red:"#C62828",white:"#FFFFFF",bg:"#F0F2F5",text:"#050505",muted:"#65676B",border:"#CED0D4"};
const LOGO="/mnt/user-data/uploads/1773405805920_image.png";

/* ══════════════════════════════════════════════════
   SEED DATA
══════════════════════════════════════════════════ */
const SEED_ADMIN={id:"admin-1",type:"admin",name:"Program Admin",email:"admin@php.edu",password:"admin123",avatar:"AD",color:C.red};
const SEED_MEMBERS=[
  {id:"s1",type:"php",name:"Nour Ahmed",username:"nour.ahmed",password:"php123",avatar:"NA",color:C.green,role:"Senior Member",points:320,joined:"Sep 2024",tasks:12,events:5,bio:"Passionate about community service.",badges:["🌟 Top Contributor","📚 Literacy Champ"],appliedEvents:[],acceptedEvents:[],notifications:[]},
  {id:"s2",type:"php",name:"Kareem Salah",username:"kareem.salah",password:"php123",avatar:"KS",color:C.blue,role:"Member",points:195,joined:"Oct 2024",tasks:7,events:3,bio:"Love organizing workshops.",badges:["🧠 Wellness Advocate"],appliedEvents:[],acceptedEvents:[],notifications:[]},
  {id:"s3",type:"php",name:"Layla Hassan",username:"layla.hassan",password:"php123",avatar:"LH",color:C.yellow,role:"Senior Member",points:285,joined:"Sep 2024",tasks:10,events:6,bio:"Tutoring enthusiast.",badges:["🥈 Runner Up","🤝 Team Player"],appliedEvents:[],acceptedEvents:[],notifications:[]},
  {id:"s4",type:"php",name:"Omar Farouk",username:"omar.farouk",password:"php123",avatar:"OF",color:C.red,role:"Member",points:240,joined:"Nov 2024",tasks:9,events:4,bio:"Sports captain.",badges:["🏃 Active Leader"],appliedEvents:[],acceptedEvents:[],notifications:[]},
  {id:"s5",type:"php",name:"Hana Mostafa",username:"hana.mostafa",password:"php123",avatar:"HM",color:C.green,role:"New Member",points:170,joined:"Jan 2025",tasks:5,events:2,bio:"New but making an impact!",badges:["🌱 Rising Star"],appliedEvents:[],acceptedEvents:[],notifications:[]},
];
const SEED_TASKS=[
  {id:"t1",authorId:"s1",authorName:"Nour Ahmed",authorAvatar:"NA",authorColor:C.green,title:"Library Outreach Session",desc:"Helped 12 students with reading comprehension at the local library.",tags:["Community","Reading"],visibility:"public",status:"approved",points:30,rating:5,feedback:"Excellent work Nour! Great community impact.",time:"3h ago",likes:[],comments:[],fileName:null},
  {id:"t2",authorId:"s3",authorName:"Layla Hassan",authorAvatar:"LH",authorColor:C.yellow,title:"Peer Tutoring Reflection",desc:"Ran a 2-hour tutoring session for Grade 9 Math. Students showed noticeable improvement.",tags:["Tutoring","Reflection"],visibility:"public",status:"approved",points:25,rating:4,feedback:"Great reflection! Keep encouraging the students.",time:"1d ago",likes:[],comments:[],fileName:null},
  {id:"t3",authorId:"s4",authorName:"Omar Farouk",authorAvatar:"OF",authorColor:C.red,title:"Morning Motivation Session",desc:"Led a motivational talk for the sports team about resilience and goal setting.",tags:["Sports","Motivation"],visibility:"public",status:"approved",points:20,rating:4,feedback:"Well done! Inspiring content.",time:"2d ago",likes:[],comments:[],fileName:null},
  {id:"t4",authorId:"s2",authorName:"Kareem Salah",authorAvatar:"KS",authorColor:C.blue,title:"Mental Health Awareness Poster",desc:"Designed and distributed mental health posters across school floors.",tags:["Mental Health","Design"],visibility:"public",status:"pending",points:0,rating:0,feedback:"",time:"5h ago",likes:[],comments:[],fileName:"poster_final.pdf"},
  {id:"t5",authorId:"s5",authorName:"Hana Mostafa",authorAvatar:"HM",authorColor:C.green,title:"Welcome Week Volunteer",desc:"Helped welcome new students during orientation week.",tags:["Community","Volunteering"],visibility:"private",status:"pending",points:0,rating:0,feedback:"",time:"6h ago",likes:[],comments:[],fileName:null},
];
const SEED_EVENTS=[
  {id:"e1",title:"Mental Health Workshop",month:"Mar",day:"20",category:"Workshop",color:C.blue,slots:20,filled:13,desc:"Interactive session on mental wellness and stress management.",applicants:[],accepted:[]},
  {id:"e2",title:"Charity Book Drive",month:"Mar",day:"25",category:"Charity",color:C.green,slots:50,filled:38,desc:"Collect and donate books to underserved communities.",applicants:[],accepted:[]},
  {id:"e3",title:"Leadership Training",month:"Apr",day:"2",category:"Training",color:C.red,slots:15,filled:9,desc:"Hands-on leadership skills workshop for PHP members.",applicants:[],accepted:[]},
];
const SEED_POSTS=[
  {id:"p1",authorId:"admin-1",authorName:"Program Admin",authorAvatar:"AD",authorColor:C.red,time:"2h ago",type:"announcement",content:"🎉 Congratulations to all PHP members who participated in last week's charity drive! Certificates issued by Friday.",likes:[],comments:[],pinned:true,tags:["Announcement"]},
  {id:"p2",authorId:"s1",authorName:"Nour Ahmed",authorAvatar:"NA",authorColor:C.green,time:"3h ago",type:"post",content:"Just finished my library outreach session — 12 students helped today! Really loving the PHP community 💚",likes:["s2","s3"],comments:[{id:"c1",authorId:"s3",authorName:"Layla Hassan",authorAvatar:"LH",authorColor:C.yellow,text:"Amazing work Nour! 🙌"}],pinned:false,tags:[]},
];
const SEED_EVENT_PROPOSALS=[
  {id:"ep1",authorId:"s2",authorName:"Kareem Salah",authorAvatar:"KS",authorColor:C.blue,title:"Anti-Bullying Awareness Day",date:"Apr 15",category:"Workshop",desc:"A full-day event with activities and talks to raise awareness about bullying. I will coordinate with the school counselor.",status:"pending",time:"1d ago"},
];

/* ══════════════════════════════════════════════════
   ATOMS
══════════════════════════════════════════════════ */
function Av({i,c,s=40}){return <div style={{width:s,height:s,borderRadius:"50%",background:c,color:"#fff",fontWeight:800,fontSize:s*.34,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"Nunito,sans-serif"}}>{i}</div>;}
function Tag({label,color}){return <span style={{background:color+"20",color,border:`1px solid ${color}40`,borderRadius:20,padding:"2px 10px",fontSize:11,fontWeight:800,fontFamily:"Nunito,sans-serif"}}>{label}</span>;}
function Btn({children,color=C.blue,outline,onClick,style:s,disabled,full}){return <button onClick={onClick} disabled={disabled} style={{background:outline?"transparent":color,color:outline?color:"#fff",border:`2px solid ${color}`,borderRadius:8,padding:"7px 18px",fontWeight:800,fontSize:13,cursor:disabled?"not-allowed":"pointer",fontFamily:"Nunito,sans-serif",opacity:disabled?.5:1,width:full?"100%":"auto",...s}}>{children}</button>;}
function Bar({v,m,c}){return <div style={{background:"#E4E6EB",borderRadius:8,height:6,overflow:"hidden"}}><div style={{width:`${Math.round((v/m)*100)}%`,background:c,height:"100%",borderRadius:8}}/></div>;}
function Stars({rating,onRate}){return(<div style={{display:"flex",gap:2}}>{[1,2,3,4,5].map(n=><span key={n} onClick={()=>onRate&&onRate(n)} style={{fontSize:18,cursor:onRate?"pointer":"default",color:n<=rating?C.yellow:"#D1D5DB"}}>{n<=rating?"★":"☆"}</span>)}</div>);}
function Modal({children,onClose,wide}){return(<div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:"fixed",inset:0,background:"#000a",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}><div style={{background:C.white,borderRadius:20,width:"100%",maxWidth:wide?680:500,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 24px 64px #0004"}}>{children}</div></div>);}
function Inp({label,name,value,onChange,placeholder,type="text",rows}){
  const inputStyle={width:"100%",padding:"10px 14px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:14,fontFamily:"Nunito,sans-serif",outline:"none",background:"#FFFFFF",color:"#050505"};
  return(<div style={{marginBottom:14}}>
    {label&&<label style={{display:"block",fontWeight:800,fontSize:13,color:C.text,marginBottom:5}}>{label}</label>}
    {rows?<textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={{...inputStyle,resize:"vertical"}}/>
    :<input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} style={inputStyle}/>}
  </div>);}
function Card({children,style:s}){return <div style={{background:C.white,borderRadius:10,boxShadow:"0 1px 4px #0001",padding:16,...s}}>{children}</div>;}
function SectionHead({title}){return <div style={{background:C.white,borderRadius:10,padding:"14px 20px",marginBottom:14,boxShadow:"0 1px 4px #0001",fontWeight:900,fontSize:20,fontFamily:"Nunito,sans-serif"}}>{title}</div>;}

/* ══════════════════════════════════════════════════
   AUTH
══════════════════════════════════════════════════ */
function Auth({onLogin,members,admins}){
  const [mode,setMode]=useState("login");
  const [ut,setUt]=useState("php");
  const [f,setF]=useState({name:"",email:"",password:"",confirm:""});
  const [err,setErr]=useState("");
  const [busy,setBusy]=useState(false);
  function h(e){setF(x=>({...x,[e.target.name]:e.target.value}));setErr("");}
  function go(){
    setBusy(true);setErr("");
    setTimeout(()=>{
      setBusy(false);
      if(mode==="login"){
        if(ut==="admin"){const a=admins.find(a=>a.email===f.email&&a.password===f.password);if(a)return onLogin(a);return setErr("Invalid admin credentials.");}
        const m=members.find(m=>m.username===f.email&&m.password===f.password);
        if(m)return onLogin(m);return setErr("Invalid username or password. Contact your admin.");
      }
      if(!f.name||!f.email||!f.password)return setErr("Please fill all fields.");
      if(f.password!==f.confirm)return setErr("Passwords don't match.");
      onLogin({id:"admin-"+Date.now(),type:"admin",name:f.name,email:f.email,password:f.password,avatar:f.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase(),color:C.red},true);
    },600);
  }
  return(
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:16,fontFamily:"Nunito,sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');*{box-sizing:border-box;margin:0;padding:0}html,body,#root{width:100%;min-height:100vh}input,textarea,select{color:#050505 !important;background:#ffffff !important;}input::placeholder,textarea::placeholder{color:#65676B !important}`}</style>
      <div style={{width:"100%",maxWidth:420}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <img src={LOGO} alt="PHP" style={{height:88,objectFit:"contain"}} onError={e=>e.target.style.display="none"}/>
          <div style={{fontWeight:900,fontSize:22,marginTop:8}}>Peer Helpers Program</div>
          <div style={{color:C.muted,fontSize:13,fontWeight:600}}>Together We Soar · معاً ننطلق</div>
        </div>
        <div style={{background:C.white,borderRadius:20,boxShadow:"0 4px 32px #0001",padding:"28px 28px 24px"}}>
          {mode==="login"&&<div style={{display:"flex",background:C.bg,borderRadius:12,padding:4,marginBottom:20,gap:4}}>
            {[{v:"php",l:"PHP Member"},{v:"admin",l:"Admin"}].map(t=>(
              <button key={t.v} onClick={()=>setUt(t.v)} style={{flex:1,padding:"8px 0",borderRadius:9,border:"none",background:ut===t.v?(t.v==="admin"?C.red:C.green):"transparent",color:ut===t.v?"#fff":C.muted,fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>{t.l}</button>
            ))}
          </div>}
          <h2 style={{fontWeight:900,fontSize:20,marginBottom:16}}>{mode==="login"?(ut==="admin"?"Admin Login":"Member Login"):"Create Admin Account"}</h2>
          {mode==="signup"&&<Inp label="Full Name" name="name" value={f.name} onChange={h} placeholder="Your full name"/>}
          <Inp label={mode==="login"&&ut==="php"?"Username":"Email"} name="email" value={f.email} onChange={h} placeholder={mode==="login"&&ut==="php"?"username (given by admin)":"your@email.com"}/>
          <Inp label="Password" name="password" type="password" value={f.password} onChange={h} placeholder="••••••••"/>
          {mode==="signup"&&<Inp label="Confirm Password" name="confirm" type="password" value={f.confirm} onChange={h} placeholder="••••••••"/>}
          {err&&<div style={{background:C.red+"15",color:C.red,borderRadius:10,padding:"8px 14px",fontSize:13,fontWeight:700,marginBottom:12}}>⚠ {err}</div>}
          <button onClick={go} disabled={busy} style={{width:"100%",padding:"12px 0",borderRadius:12,background:mode==="signup"?C.red:ut==="admin"?C.red:C.green,color:"#fff",border:"none",fontWeight:900,fontSize:15,cursor:"pointer",fontFamily:"Nunito,sans-serif",marginBottom:16,opacity:busy?.7:1}}>
            {busy?"…":mode==="login"?"Log In":"Create Account"}
          </button>
          <div style={{textAlign:"center",fontSize:13,color:C.muted}}>
            {mode==="login"&&ut==="admin"&&<>No account? <span onClick={()=>{setMode("signup");setErr("");}} style={{color:C.blue,fontWeight:800,cursor:"pointer"}}>Create Admin Account</span></>}
            {mode==="login"&&ut==="php"&&<span style={{color:C.muted}}>Login credentials are set by your admin.</span>}
            {mode==="signup"&&<>Already have an account? <span onClick={()=>{setMode("login");setErr("");}} style={{color:C.blue,fontWeight:800,cursor:"pointer"}}>Log In</span></>}
          </div>
          {mode==="login"&&ut==="php"&&<div style={{marginTop:14,background:C.blue+"12",borderRadius:10,padding:"10px 14px",fontSize:12,color:C.muted,fontWeight:600}}>💡 Your credentials are created by the admin. Ask them if you need access.<br/><b>Demo:</b> nour.ahmed / php123</div>}
          {mode==="login"&&ut==="admin"&&<div style={{marginTop:14,background:C.red+"10",borderRadius:10,padding:"10px 14px",fontSize:12,color:C.muted,fontWeight:600}}><b>Demo:</b> admin@php.edu / admin123</div>}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   FEATURE 2 — PROFILE DASHBOARD (full page)
══════════════════════════════════════════════════ */
function ProfilePage({member,allTasks,allEvents,onBack}){
  const myTasks=allTasks.filter(t=>t.authorId===member.id);
  const myEvents=allEvents.filter(e=>e.applicants.includes(member.id)||e.accepted.includes(member.id));
  const approved=myTasks.filter(t=>t.status==="approved");
  const pending=myTasks.filter(t=>t.status==="pending");
  return(
    <div style={{fontFamily:"Nunito,sans-serif"}}>
      <button onClick={onBack} style={{background:"none",border:"none",color:C.blue,fontWeight:800,fontSize:14,cursor:"pointer",marginBottom:14,fontFamily:"Nunito,sans-serif"}}>← Back</button>
      {/* Cover + avatar */}
      <div style={{background:`linear-gradient(135deg,${member.color}80,${member.color}25)`,borderRadius:14,padding:"28px 24px 20px",marginBottom:14,position:"relative"}}>
        <div style={{display:"flex",gap:18,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{border:"4px solid #fff",borderRadius:"50%",boxShadow:"0 2px 12px #0002"}}><Av i={member.avatar} c={member.color} s={72}/></div>
          <div>
            <div style={{fontWeight:900,fontSize:22}}>{member.name}</div>
            <div style={{color:member.color,fontWeight:700,fontSize:14,marginBottom:6}}>{member.role}</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {member.badges.map(b=><span key={b} style={{background:"#fff8",borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:800}}>{b}</span>)}
            </div>
          </div>
        </div>
        <p style={{marginTop:14,fontSize:14,color:C.muted}}>{member.bio||"No bio yet."}</p>
      </div>
      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))",gap:10,marginBottom:14}}>
        {[{l:"Total Points",v:member.points,c:C.yellow},{l:"Tasks Done",v:member.tasks,c:C.blue},{l:"Events",v:member.events,c:C.green},{l:"Pending",v:pending.length,c:C.red}].map(s=>(
          <Card key={s.l} style={{textAlign:"center",padding:"14px 8px"}}>
            <div style={{fontWeight:900,fontSize:22,color:s.c}}>{s.v}</div>
            <div style={{fontSize:11,color:C.muted,fontWeight:700}}>{s.l}</div>
          </Card>
        ))}
      </div>
      {/* My Tasks */}
      <Card style={{marginBottom:14}}>
        <div style={{fontWeight:900,fontSize:16,marginBottom:14}}>📋 My Tasks</div>
        {myTasks.length===0&&<div style={{color:C.muted,fontSize:14}}>No tasks submitted yet.</div>}
        {myTasks.map(t=>(
          <div key={t.id} style={{borderBottom:`1px solid ${C.border}`,paddingBottom:12,marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:6}}>
              <div>
                <div style={{fontWeight:800,fontSize:14}}>{t.title}</div>
                <div style={{fontSize:12,color:C.muted}}>{t.time}</div>
              </div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                {t.status==="approved"&&<span style={{background:C.green+"20",color:C.green,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:800}}>✓ Approved +{t.points}pts</span>}
                {t.status==="pending"&&<span style={{background:C.yellow+"20",color:"#8B6914",borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:800}}>⏳ Pending</span>}
                {t.status==="declined"&&<span style={{background:C.red+"20",color:C.red,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:800}}>✗ Declined</span>}
              </div>
            </div>
            {t.status==="approved"&&t.rating>0&&<div style={{marginTop:8,background:C.yellow+"12",borderRadius:10,padding:"8px 12px"}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}><Stars rating={t.rating}/><span style={{fontWeight:800,fontSize:13,color:"#8B6914"}}>{t.rating}/5</span></div>
              {t.feedback&&<div style={{fontSize:13,color:C.muted}}>💬 "{t.feedback}"</div>}
            </div>}
          </div>
        ))}
      </Card>
      {/* My Events */}
      <Card>
        <div style={{fontWeight:900,fontSize:16,marginBottom:14}}>📅 My Events</div>
        {myEvents.length===0&&<div style={{color:C.muted,fontSize:14}}>No events applied to yet.</div>}
        {myEvents.map(e=>(
          <div key={e.id} style={{display:"flex",gap:12,alignItems:"center",marginBottom:12,padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
            <div style={{background:e.color,color:"#fff",borderRadius:10,padding:"8px 12px",textAlign:"center",minWidth:44}}>
              <div style={{fontWeight:900,fontSize:16}}>{e.day}</div>
              <div style={{fontSize:10,fontWeight:700}}>{e.month}</div>
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:14}}>{e.title}</div>
              <Tag label={e.category} color={e.color}/>
            </div>
            {e.accepted.includes(member.id)?<span style={{background:C.green+"20",color:C.green,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:800}}>✓ Accepted</span>:<span style={{background:C.yellow+"20",color:"#8B6914",borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:800}}>⏳ Applied</span>}
          </div>
        ))}
      </Card>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   FEATURE 3+4 — TASK UPLOAD + FEEDBACK MODAL
══════════════════════════════════════════════════ */
function TaskUploadModal({user,onClose,onSubmit}){
  const fileRef=useRef();
  const [f,setF]=useState({title:"",desc:"",tags:"",visibility:"public"});
  const [file,setFile]=useState(null);
  const [err,setErr]=useState("");
  function h(e){setF(x=>({...x,[e.target.name]:e.target.value}));}
  function pickFile(e){
    const fl=e.target.files[0];
    if(!fl)return;
    if(fl.size>5*1024*1024)return setErr("File too large (max 5MB).");
    const ok=["application/pdf","image/jpeg","image/png","image/jpg"];
    if(!ok.includes(fl.type))return setErr("Only PDF, JPG, PNG allowed.");
    setFile(fl);setErr("");
  }
  function submit(){
    if(!f.title.trim()||!f.desc.trim())return setErr("Title and description are required.");
    onSubmit({id:"t"+Date.now(),authorId:user.id,authorName:user.name,authorAvatar:user.avatar,authorColor:user.color,title:f.title,desc:f.desc,tags:f.tags.split(",").map(t=>t.trim()).filter(Boolean),visibility:f.visibility,status:"pending",points:0,rating:0,feedback:"",time:"just now",likes:[],comments:[],fileName:file?file.name:null});
    onClose();
  }
  return(
    <Modal onClose={onClose}>
      <div style={{fontFamily:"Nunito,sans-serif",padding:"22px 24px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <h2 style={{fontWeight:900,fontSize:18}}>📋 Submit a Task</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:C.muted}}>✕</button>
        </div>
        <Inp label="Task Title" name="title" value={f.title} onChange={h} placeholder="e.g. Library Outreach Session"/>
        <Inp label="Description" name="desc" value={f.desc} onChange={h} placeholder="Describe what you did, who you helped, the impact…" rows={4}/>
        <Inp label="Tags (comma separated)" name="tags" value={f.tags} onChange={h} placeholder="Community, Reading, Tutoring…"/>
        <div style={{marginBottom:14}}>
          <label style={{display:"block",fontWeight:800,fontSize:13,marginBottom:5}}>Visibility</label>
          <div style={{display:"flex",gap:8}}>
            {["public","private"].map(v=>(
              <button key={v} onClick={()=>setF(x=>({...x,visibility:v}))} style={{background:f.visibility===v?(v==="public"?C.green:C.blue):C.bg,color:f.visibility===v?"#fff":C.muted,border:`1.5px solid ${v==="public"?C.green:C.blue}40`,borderRadius:20,padding:"6px 18px",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>
                {v==="public"?"🌍 Public":"🔒 Private (Admin Only)"}
              </button>
            ))}
          </div>
        </div>
        {/* File Upload */}
        <div style={{marginBottom:16}}>
          <label style={{display:"block",fontWeight:800,fontSize:13,marginBottom:5}}>Attach File (PDF/Image, max 5MB)</label>
          <div onClick={()=>fileRef.current.click()} style={{border:`2px dashed ${file?C.green:C.border}`,borderRadius:12,padding:"16px",textAlign:"center",cursor:"pointer",background:file?C.green+"08":C.bg}}>
            <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={pickFile} style={{display:"none"}}/>
            {file?<div style={{color:C.green,fontWeight:800}}>📎 {file.name} <span style={{color:C.muted,fontWeight:400,fontSize:12}}>({(file.size/1024).toFixed(0)}KB)</span></div>:<div style={{color:C.muted,fontSize:13}}>Click to attach a file <span style={{fontSize:11}}>(optional)</span></div>}
          </div>
        </div>
        {err&&<div style={{background:C.red+"15",color:C.red,borderRadius:10,padding:"8px 14px",fontSize:13,fontWeight:700,marginBottom:12}}>⚠ {err}</div>}
        <div style={{display:"flex",gap:8}}>
          <Btn color={C.muted} outline onClick={onClose} style={{flex:1}}>Cancel</Btn>
          <Btn color={C.green} onClick={submit} style={{flex:2}} disabled={!f.title.trim()||!f.desc.trim()}>Submit Task</Btn>
        </div>
      </div>
    </Modal>
  );
}

/* ── Admin: Rate Task Modal (Feature 4) ── */
function RateTaskModal({task,onClose,onRate}){
  const [stars,setStars]=useState(task.rating||0);
  const [fb,setFb]=useState(task.feedback||"");
  const [pts,setPts]=useState(task.points||10);
  return(
    <Modal onClose={onClose}>
      <div style={{fontFamily:"Nunito,sans-serif",padding:"22px 24px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h2 style={{fontWeight:900,fontSize:18}}>⭐ Rate Task</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:C.muted}}>✕</button>
        </div>
        <div style={{background:C.bg,borderRadius:12,padding:"12px 14px",marginBottom:16}}>
          <div style={{fontWeight:800,fontSize:15}}>{task.title}</div>
          <div style={{fontSize:13,color:C.muted,marginTop:4}}>By {task.authorName}</div>
          <p style={{fontSize:13,marginTop:8,lineHeight:1.5}}>{task.desc}</p>
          {task.fileName&&<div style={{marginTop:6,fontSize:12,color:C.blue}}>📎 {task.fileName}</div>}
        </div>
        <div style={{marginBottom:14}}>
          <label style={{display:"block",fontWeight:800,fontSize:13,marginBottom:8}}>Star Rating</label>
          <Stars rating={stars} onRate={setStars}/>
        </div>
        <div style={{marginBottom:14}}>
          <label style={{display:"block",fontWeight:800,fontSize:13,marginBottom:5}}>Points to Award</label>
          <input type="number" min={0} max={100} value={pts} onChange={e=>setPts(Number(e.target.value))}
            style={{width:"100%",padding:"10px 14px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:14,fontFamily:"Nunito,sans-serif",outline:"none",background:"#fff",color:"#050505"}}/>
        </div>
        <div style={{marginBottom:16}}>
          <label style={{display:"block",fontWeight:800,fontSize:13,marginBottom:5}}>Written Feedback</label>
          <textarea value={fb} onChange={e=>setFb(e.target.value)} rows={3} placeholder="Write constructive feedback to help the student improve…"
            style={{width:"100%",padding:"10px 14px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:14,fontFamily:"Nunito,sans-serif",outline:"none",background:C.bg,resize:"vertical"}}/>
        </div>
        <div style={{display:"flex",gap:8}}>
          <Btn color={C.red} outline onClick={()=>{onRate(task.id,"declined",0,0,"");onClose();}} style={{flex:1}}>✗ Decline</Btn>
          <Btn color={C.green} onClick={()=>{if(stars===0)return;onRate(task.id,"approved",stars,pts,fb);onClose();}} disabled={stars===0} style={{flex:2}}>✓ Approve & Rate</Btn>
        </div>
      </div>
    </Modal>
  );
}

/* ══════════════════════════════════════════════════
   FEATURE 5 — VIEW TASKS PAGE
══════════════════════════════════════════════════ */
function TasksPage({tasks,currentUser,members,onLike,onComment,onRate,onSubmitTask}){
  const [search,setSearch]=useState("");
  const [catFilter,setCat]=useState("All");
  const [statusFilter,setStatus]=useState("All");
  const [rateTask,setRateTask]=useState(null);
  const cats=["All",...new Set(tasks.flatMap(t=>t.tags))];
  const visible=tasks.filter(t=>{
    if(t.visibility==="private"&&t.authorId!==currentUser.id&&currentUser.type!=="admin")return false;
    if(catFilter!=="All"&&!t.tags.includes(catFilter))return false;
    if(statusFilter!=="All"&&t.status!==statusFilter)return false;
    if(search&&!t.title.toLowerCase().includes(search.toLowerCase())&&!t.authorName.toLowerCase().includes(search.toLowerCase()))return false;
    return true;
  });
  return(
    <div style={{fontFamily:"Nunito,sans-serif"}}>
      <SectionHead title="📋 All Tasks"/>
      {/* Search + Filter */}
      <Card style={{marginBottom:14}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search by title or author…"
          style={{width:"100%",padding:"10px 16px",borderRadius:24,border:`1.5px solid ${C.border}`,fontSize:14,fontFamily:"Nunito,sans-serif",outline:"none",background:"#fff",color:"#050505",marginBottom:12}}/>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
          <span style={{fontWeight:800,fontSize:12,color:C.muted,alignSelf:"center"}}>Category:</span>
          {cats.slice(0,7).map(c=><button key={c} onClick={()=>setCat(c)} style={{background:catFilter===c?C.blue:C.bg,color:catFilter===c?"#fff":C.muted,border:`1.5px solid ${catFilter===c?C.blue:C.border}`,borderRadius:20,padding:"4px 12px",fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>{c}</button>)}
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <span style={{fontWeight:800,fontSize:12,color:C.muted,alignSelf:"center"}}>Status:</span>
          {["All","approved","pending","declined"].map(s=><button key={s} onClick={()=>setStatus(s)} style={{background:statusFilter===s?C.green:C.bg,color:statusFilter===s?"#fff":C.muted,border:`1.5px solid ${statusFilter===s?C.green:C.border}`,borderRadius:20,padding:"4px 12px",fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"Nunito,sans-serif",textTransform:"capitalize"}}>{s}</button>)}
        </div>
      </Card>
      {currentUser.type==="php"&&<div style={{marginBottom:14}}><Btn color={C.green} onClick={onSubmitTask} style={{width:"100%",padding:"11px 0",fontSize:15}}>+ Submit New Task</Btn></div>}
      {visible.length===0&&<Card><div style={{textAlign:"center",color:C.muted,padding:"20px 0"}}>No tasks found.</div></Card>}
      {visible.map(t=>(
        <TaskCard key={t.id} task={t} currentUser={currentUser} onLike={onLike} onComment={onComment}
          onRate={currentUser.type==="admin"&&t.status==="pending"?()=>setRateTask(t):null}/>
      ))}
      {rateTask&&<RateTaskModal task={rateTask} onClose={()=>setRateTask(null)} onRate={(...args)=>{onRate(...args);setRateTask(null);}}/>}
    </div>
  );
}

/* ── Task Card (Feature 3,4,5,9) ── */
function TaskCard({task,currentUser,onLike,onComment,onRate}){
  const [showC,setShowC]=useState(false);
  const [ct,setCt]=useState("");
  const liked=task.likes.includes(currentUser.id);
  const stColors={approved:C.green,pending:C.yellow,declined:C.red};
  const stLabels={approved:"✓ Approved",pending:"⏳ Pending",declined:"✗ Declined"};
  return(
    <Card style={{marginBottom:12}}>
      <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10,flexWrap:"wrap"}}>
        <Av i={task.authorAvatar} c={task.authorColor} s={42}/>
        <div style={{flex:1,minWidth:100}}>
          <div style={{fontWeight:800,fontSize:15}}>{task.authorName}</div>
          <div style={{fontSize:12,color:C.muted}}>{task.time}</div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
          <span style={{background:stColors[task.status]+"20",color:stColors[task.status],borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:800}}>{stLabels[task.status]}</span>
          {task.status==="approved"&&task.points>0&&<span style={{background:C.yellow+"20",color:"#8B6914",borderRadius:10,padding:"3px 8px",fontSize:11,fontWeight:800}}>+{task.points} pts</span>}
          {task.visibility==="private"&&<span style={{background:C.blue+"15",color:C.blue,borderRadius:10,padding:"3px 8px",fontSize:11,fontWeight:800}}>🔒 Private</span>}
          {onRate&&<Btn color={C.blue} onClick={onRate} style={{padding:"4px 12px",fontSize:12}}>⭐ Review</Btn>}
        </div>
      </div>
      <div style={{fontWeight:800,fontSize:16,marginBottom:6}}>{task.title}</div>
      <p style={{fontSize:14,color:C.text,lineHeight:1.55,marginBottom:10}}>{task.desc}</p>
      {task.fileName&&<div style={{background:C.blue+"10",borderRadius:8,padding:"6px 12px",fontSize:13,color:C.blue,fontWeight:700,marginBottom:10}}>📎 {task.fileName}</div>}
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>{task.tags.map(t=><Tag key={t} label={t} color={C.blue}/>)}</div>
      {/* Admin feedback display */}
      {task.status==="approved"&&task.rating>0&&<div style={{background:C.yellow+"12",borderRadius:10,padding:"10px 14px",marginBottom:12,border:`1px solid ${C.yellow}40`}}>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}><Stars rating={task.rating}/><span style={{fontWeight:800,fontSize:12,color:"#8B6914"}}>{task.rating}/5 stars</span></div>
        {task.feedback&&<div style={{fontSize:13,color:C.muted}}>💬 Admin feedback: "{task.feedback}"</div>}
      </div>}
      {/* Likes / comments count */}
      {(task.likes.length>0||task.comments.length>0)&&<div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:C.muted,borderTop:`1px solid ${C.border}`,paddingTop:8,marginTop:4,marginBottom:4}}>
        {task.likes.length>0&&<span>👍 {task.likes.length}</span>}
        {task.comments.length>0&&<span onClick={()=>setShowC(s=>!s)} style={{cursor:"pointer"}}>{task.comments.length} comment{task.comments.length>1?"s":""}</span>}
      </div>}
      {/* Action bar — Peer Feedback (Feature 9) */}
      {task.status==="approved"&&<div style={{display:"flex",gap:2,borderTop:`1px solid ${C.border}`,marginTop:4}}>
        <button onClick={()=>onLike(task.id)} style={{flex:1,background:"none",border:"none",padding:"8px 0",cursor:"pointer",fontWeight:800,fontSize:13,color:liked?C.blue:C.muted,fontFamily:"Nunito,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
          {liked?"👍":"👍"} {liked?"Liked":"Like"}
        </button>
        <button onClick={()=>setShowC(s=>!s)} style={{flex:1,background:"none",border:"none",padding:"8px 0",cursor:"pointer",fontWeight:800,fontSize:13,color:showC?C.blue:C.muted,fontFamily:"Nunito,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>💬 Comment</button>
      </div>}
      {showC&&<div style={{marginTop:10,borderTop:`1px solid ${C.border}`,paddingTop:10}}>
        {task.comments.map(c=>(
          <div key={c.id} style={{display:"flex",gap:8,marginBottom:8}}>
            <Av i={c.authorAvatar} c={c.authorColor} s={30}/>
            <div style={{background:C.bg,borderRadius:14,padding:"6px 12px",flex:1}}>
              <div style={{fontWeight:800,fontSize:12}}>{c.authorName}</div>
              <div style={{fontSize:13}}>{c.text}</div>
            </div>
          </div>
        ))}
        <div style={{display:"flex",gap:8,marginTop:6}}>
          <Av i={currentUser.avatar} c={currentUser.color} s={30}/>
          <input value={ct} onChange={e=>setCt(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&ct.trim()){onComment(task.id,ct,"task");setCt("");}}}
            placeholder="Add a comment… (Enter)"
            style={{flex:1,padding:"7px 14px",borderRadius:20,border:`1.5px solid ${C.border}`,fontSize:13,fontFamily:"Nunito,sans-serif",outline:"none",background:"#fff",color:"#050505"}}/>
        </div>
      </div>}
    </Card>
  );
}

/* ══════════════════════════════════════════════════
   FEATURE 6+7 — EVENTS PAGE (Participation + Proposal)
══════════════════════════════════════════════════ */
function EventsPage({events,proposals,currentUser,members,onApply,onManageEvent,onSubmitProposal,onRateProposal}){
  const [showProposal,setShowProposal]=useState(false);
  const [catFilter,setCat]=useState("All");
  const cats=["All","Workshop","Charity","Training","Competition"];
  const filtered=events.filter(e=>catFilter==="All"||e.category===catFilter);
  return(
    <div style={{fontFamily:"Nunito,sans-serif"}}>
      {/* Header row with title + propose button */}
      <div style={{background:C.white,borderRadius:10,padding:"14px 20px",marginBottom:14,boxShadow:"0 1px 4px #0001",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
        <span style={{fontWeight:900,fontSize:20,fontFamily:"Nunito,sans-serif"}}>📅 Events</span>
        {currentUser.type==="php"&&<Btn color={C.blue} onClick={()=>setShowProposal(true)} style={{fontSize:13,padding:"8px 18px"}}>💡 Propose an Event</Btn>}
      </div>
      {/* Category filter */}
      <Card style={{marginBottom:14}}>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {cats.map(c=><button key={c} onClick={()=>setCat(c)} style={{background:catFilter===c?C.blue:C.bg,color:catFilter===c?"#fff":C.muted,border:`1.5px solid ${catFilter===c?C.blue:C.border}`,borderRadius:20,padding:"6px 16px",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>{c}</button>)}
        </div>
      </Card>
      {/* Events list */}
      {filtered.map(e=>{
        const applied=e.applicants.includes(currentUser.id);
        const accepted=e.accepted.includes(currentUser.id);
        return(
          <Card key={e.id} style={{marginBottom:12,borderLeft:`5px solid ${e.color}`}}>
            <div style={{display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
              <div style={{background:e.color,color:"#fff",borderRadius:12,padding:"12px 16px",textAlign:"center",minWidth:54,flexShrink:0}}>
                <div style={{fontWeight:900,fontSize:20}}>{e.day}</div>
                <div style={{fontSize:11,fontWeight:700}}>{e.month}</div>
              </div>
              <div style={{flex:1,minWidth:160}}>
                <div style={{fontWeight:900,fontSize:17}}>{e.title}</div>
                <div style={{margin:"4px 0 8px"}}><Tag label={e.category} color={e.color}/></div>
                <p style={{fontSize:13,color:C.muted,margin:"0 0 8px"}}>{e.desc}</p>
                <Bar v={e.filled} m={e.slots} c={e.color}/>
                <div style={{fontSize:12,color:C.muted,marginTop:4}}>{e.filled}/{e.slots} spots filled</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end",flexShrink:0}}>
                {currentUser.type==="php"&&(
                  accepted?<span style={{background:C.green+"20",color:C.green,borderRadius:20,padding:"5px 14px",fontSize:12,fontWeight:800}}>✓ Accepted</span>
                  :applied?<span style={{background:C.yellow+"20",color:"#8B6914",borderRadius:20,padding:"5px 14px",fontSize:12,fontWeight:800}}>⏳ Applied</span>
                  :<Btn color={e.color} onClick={()=>onApply(e.id)} disabled={e.filled>=e.slots}>Apply to Join</Btn>
                )}
                {currentUser.type==="admin"&&<Btn color={e.color} outline onClick={()=>onManageEvent(e)}>Manage</Btn>}
              </div>
            </div>
          </Card>
        );
      })}
      {/* Proposals section */}
      <div style={{marginTop:20}}>
        <div style={{fontWeight:900,fontSize:17,marginBottom:14}}>💡 Event Proposals</div>
        {proposals.length===0&&<Card><div style={{color:C.muted,fontSize:14,textAlign:"center",padding:"12px 0"}}>No proposals yet.</div></Card>}
        {proposals.map(p=>(
          <Card key={p.id} style={{marginBottom:10}}>
            <div style={{display:"flex",gap:10,alignItems:"flex-start",flexWrap:"wrap"}}>
              <Av i={p.authorAvatar} c={p.authorColor} s={40}/>
              <div style={{flex:1,minWidth:120}}>
                <div style={{fontWeight:800,fontSize:15}}>{p.title}</div>
                <div style={{fontSize:12,color:C.muted}}>{p.authorName} · {p.date} · <Tag label={p.category} color={C.blue}/></div>
                <p style={{fontSize:13,color:C.text,marginTop:6,lineHeight:1.5}}>{p.desc}</p>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end",flexShrink:0}}>
                {p.status==="pending"&&currentUser.type==="admin"&&<>
                  <Btn color={C.green} onClick={()=>onRateProposal(p.id,"approved")} style={{padding:"5px 12px",fontSize:12}}>✓ Accept</Btn>
                  <Btn color={C.red} onClick={()=>onRateProposal(p.id,"declined")} style={{padding:"5px 12px",fontSize:12}}>✗ Decline</Btn>
                </>}
                {p.status!=="pending"&&<span style={{background:(p.status==="approved"?C.green:C.red)+"20",color:p.status==="approved"?C.green:C.red,borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:800}}>{p.status==="approved"?"✓ Approved":"✗ Declined"}</span>}
                {p.status==="pending"&&currentUser.type==="php"&&<span style={{background:C.yellow+"20",color:"#8B6914",borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:800}}>⏳ Pending</span>}
              </div>
            </div>
          </Card>
        ))}
      </div>
      {showProposal&&<EventProposalModal user={currentUser} onClose={()=>setShowProposal(false)} onSubmit={p=>{onSubmitProposal(p);setShowProposal(false);}}/>}
    </div>
  );
}

function EventProposalModal({user,onClose,onSubmit}){
  const [f,setF]=useState({title:"",date:"",category:"Workshop",desc:""});
  function h(e){setF(x=>({...x,[e.target.name]:e.target.value}));}
  return(
    <Modal onClose={onClose}>
      <div style={{fontFamily:"Nunito,sans-serif",padding:"22px 24px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <h2 style={{fontWeight:900,fontSize:18}}>💡 Propose an Event</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:C.muted}}>✕</button>
        </div>
        <Inp label="Event Title" name="title" value={f.title} onChange={h} placeholder="e.g. Anti-Bullying Day"/>
        <Inp label="Proposed Date" name="date" value={f.date} onChange={h} placeholder="e.g. Apr 20"/>
        <div style={{marginBottom:14}}>
          <label style={{display:"block",fontWeight:800,fontSize:13,marginBottom:5}}>Category</label>
          <select name="category" value={f.category} onChange={h} style={{width:"100%",padding:"10px 14px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:14,fontFamily:"Nunito,sans-serif",outline:"none",background:C.bg}}>
            {["Workshop","Charity","Training","Competition"].map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <Inp label="Description & Plan" name="desc" value={f.desc} onChange={h} placeholder="Describe the event, goals, what you'll need…" rows={4}/>
        <Btn color={C.blue} onClick={()=>{if(!f.title||!f.date||!f.desc)return;onSubmit({id:"ep"+Date.now(),authorId:user.id,authorName:user.name,authorAvatar:user.avatar,authorColor:user.color,...f,status:"pending",time:"just now"});}} disabled={!f.title||!f.date||!f.desc} style={{width:"100%",padding:"12px 0",fontSize:15}}>Submit Proposal</Btn>
      </div>
    </Modal>
  );
}

/* Event Manage Modal (Admin) */
function ManageEventModal({event,members,onClose,onAccept}){
  return(
    <Modal onClose={onClose} wide>
      <div style={{fontFamily:"Nunito,sans-serif",padding:"22px 24px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h2 style={{fontWeight:900,fontSize:18}}>Manage: {event.title}</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:C.muted}}>✕</button>
        </div>
        <div style={{marginBottom:14}}>
          <div style={{fontWeight:800,marginBottom:8}}>Applicants ({event.applicants.length})</div>
          {event.applicants.length===0&&<div style={{color:C.muted,fontSize:14}}>No applicants yet.</div>}
          {event.applicants.map(id=>{
            const m=members.find(x=>x.id===id);
            if(!m)return null;
            const acc=event.accepted.includes(id);
            return(
              <div key={id} style={{display:"flex",gap:10,alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
                <Av i={m.avatar} c={m.color} s={36}/>
                <div style={{flex:1}}><div style={{fontWeight:800,fontSize:14}}>{m.name}</div><div style={{fontSize:12,color:C.muted}}>{m.role}</div></div>
                {acc?<span style={{background:C.green+"20",color:C.green,borderRadius:20,padding:"4px 12px",fontSize:12,fontWeight:800}}>✓ Accepted</span>
                :<Btn color={C.green} onClick={()=>onAccept(event.id,id)} style={{padding:"5px 12px",fontSize:12}}>Accept</Btn>}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

/* ══════════════════════════════════════════════════
   FEATURE 8 — NOTIFICATIONS
══════════════════════════════════════════════════ */
function NotifPanel({notifs,onClose,onClear}){
  return(
    <div style={{position:"fixed",top:62,right:12,width:320,maxWidth:"calc(100vw - 24px)",background:C.white,borderRadius:14,boxShadow:"0 8px 32px #0003",border:`1px solid ${C.border}`,zIndex:600,overflow:"hidden",fontFamily:"Nunito,sans-serif"}}>
      <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontWeight:900,fontSize:16}}>🔔 Notifications</span>
        <div style={{display:"flex",gap:10}}>
          {notifs.length>0&&<button onClick={onClear} style={{background:"none",border:"none",fontSize:12,color:C.blue,fontWeight:800,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>Clear all</button>}
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:18,color:C.muted,cursor:"pointer"}}>✕</button>
        </div>
      </div>
      <div style={{maxHeight:340,overflowY:"auto"}}>
        {notifs.length===0&&<div style={{padding:24,textAlign:"center",color:C.muted,fontSize:14}}>You're all caught up! 🎉</div>}
        {[...notifs].reverse().map(n=>(
          <div key={n.id} style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",gap:10,background:n.read?"transparent":C.blue+"08"}}>
            <span style={{fontSize:20,flexShrink:0}}>{n.icon}</span>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:C.text}}>{n.text}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:3}}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   HOME FEED
══════════════════════════════════════════════════ */
function PostCard({post,currentUser,onLike,onComment}){
  const [showC,setShowC]=useState(false);
  const [ct,setCt]=useState("");
  const liked=post.likes.includes(currentUser.id);
  const accent=post.type==="announcement"?C.red:post.authorColor;
  return(
    <Card style={{marginBottom:12,border:post.pinned?`2px solid ${accent}40`:"none"}}>
      {post.pinned&&<div style={{background:accent+"18",padding:"5px 16px",fontSize:11,fontWeight:800,color:accent,margin:"-16px -16px 12px",borderRadius:"10px 10px 0 0"}}>📌 PINNED</div>}
      <div style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}>
        <Av i={post.authorAvatar} c={post.authorColor} s={42}/>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <span style={{fontWeight:800,fontSize:15}}>{post.authorName}</span>
            {post.type==="announcement"&&<Tag label="📣 Announcement" color={C.red}/>}
          </div>
          <div style={{fontSize:12,color:C.muted}}>{post.time}</div>
        </div>
      </div>
      <p style={{fontSize:15,lineHeight:1.55,marginBottom:10}}>{post.content}</p>
      {(post.likes.length>0||post.comments.length>0)&&<div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:C.muted,borderBottom:`1px solid ${C.border}`,paddingBottom:8,marginBottom:4}}>
        {post.likes.length>0&&<span>👍 {post.likes.length}</span>}
        {post.comments.length>0&&<span onClick={()=>setShowC(s=>!s)} style={{cursor:"pointer"}}>{post.comments.length} comments</span>}
      </div>}
      <div style={{display:"flex",gap:2}}>
        {[{icon:"👍",label:liked?"Liked":"Like",action:()=>onLike(post.id),active:liked},{icon:"💬",label:"Comment",action:()=>setShowC(s=>!s),active:showC},{icon:"🔗",label:"Share",action:()=>{},active:false}].map(a=>(
          <button key={a.label} onClick={a.action} style={{flex:1,background:"none",border:"none",borderRadius:8,padding:"8px 0",cursor:"pointer",fontWeight:800,fontSize:13,color:a.active?C.blue:C.muted,fontFamily:"Nunito,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>{a.icon} {a.label}</button>
        ))}
      </div>
      {showC&&<div style={{marginTop:10,borderTop:`1px solid ${C.border}`,paddingTop:10}}>
        {post.comments.map(c=>(
          <div key={c.id} style={{display:"flex",gap:8,marginBottom:8}}>
            <Av i={c.authorAvatar} c={c.authorColor} s={30}/>
            <div style={{background:C.bg,borderRadius:14,padding:"6px 12px",flex:1}}>
              <div style={{fontWeight:800,fontSize:12}}>{c.authorName}</div>
              <div style={{fontSize:13}}>{c.text}</div>
            </div>
          </div>
        ))}
        <div style={{display:"flex",gap:8,marginTop:6}}>
          <Av i={currentUser.avatar} c={currentUser.color} s={30}/>
          <input value={ct} onChange={e=>setCt(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&ct.trim()){onComment(post.id,ct,"post");setCt("");}}}
            placeholder="Write a comment… (Enter)"
            style={{flex:1,padding:"7px 14px",borderRadius:20,border:`1.5px solid ${C.border}`,fontSize:13,fontFamily:"Nunito,sans-serif",outline:"none",background:"#fff",color:"#050505"}}/>
        </div>
      </div>}
    </Card>
  );
}

/* ══════════════════════════════════════════════════
   MEMBERS PAGE
══════════════════════════════════════════════════ */
function MembersPage({members,onView}){
  const [q,setQ]=useState("");
  const sorted=[...members].sort((a,b)=>b.points-a.points);
  const filtered=members.filter(m=>m.name.toLowerCase().includes(q.toLowerCase())||m.role.toLowerCase().includes(q.toLowerCase()));
  return(
    <div style={{fontFamily:"Nunito,sans-serif"}}>
      <SectionHead title="👥 PHP Members"/>
      <Card style={{marginBottom:14}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="🔍  Search by name or role…"
          style={{width:"100%",padding:"10px 16px",borderRadius:24,border:`1.5px solid ${C.border}`,fontSize:14,fontFamily:"Nunito,sans-serif",outline:"none",background:"#fff",color:"#050505"}}/>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,220px),1fr))",gap:10,marginBottom:14}}>
        {sorted.slice(0,3).map((m,i)=>(
          <div key={m.id} onClick={()=>onView(m)} style={{background:C.white,borderRadius:12,padding:"18px 14px",textAlign:"center",boxShadow:"0 1px 4px #0001",cursor:"pointer",border:`2px solid ${[C.yellow,C.muted,"#cd7f32"][i]}40`}}>
            <div style={{fontSize:26,marginBottom:6}}>{["🥇","🥈","🥉"][i]}</div>
            <Av i={m.avatar} c={m.color} s={52}/>
            <div style={{fontWeight:800,fontSize:14,marginTop:8}}>{m.name}</div>
            <div style={{color:m.color,fontWeight:900,fontSize:17}}>{m.points} pts</div>
            <div style={{fontSize:12,color:C.muted}}>{m.role}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,260px),1fr))",gap:12}}>
        {filtered.map(m=>(
          <div key={m.id} onClick={()=>onView(m)} style={{background:C.white,borderRadius:12,padding:16,boxShadow:"0 1px 4px #0001",cursor:"pointer"}}>
            <div style={{display:"flex",gap:12,alignItems:"center"}}>
              <Av i={m.avatar} c={m.color} s={50}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:800,fontSize:15,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.name}</div>
                <div style={{fontSize:12,color:m.color,fontWeight:700}}>{m.role}</div>
                <div style={{fontSize:11,color:C.muted}}>Joined {m.joined}</div>
              </div>
              <div style={{fontWeight:900,fontSize:18,color:C.yellow,textAlign:"right"}}>#{sorted.findIndex(x=>x.id===m.id)+1}</div>
            </div>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              {[{l:"pts",v:m.points,c:m.color},{l:"tasks",v:m.tasks,c:C.blue},{l:"events",v:m.events,c:C.green}].map(s=>(
                <div key={s.l} style={{flex:1,textAlign:"center",background:C.bg,borderRadius:8,padding:"6px 4px"}}>
                  <div style={{fontWeight:900,color:s.c,fontSize:16}}>{s.v}</div>
                  <div style={{fontSize:10,color:C.muted,fontWeight:700}}>{s.l}</div>
                </div>
              ))}
            </div>
            <p style={{fontSize:12,color:C.muted,margin:"10px 0 8px",lineHeight:1.4}}>{m.bio}</p>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{m.badges.map(b=><span key={b} style={{background:C.yellow+"20",color:"#8B6914",borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:800}}>{b}</span>)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ADMIN PANEL
══════════════════════════════════════════════════ */
function AdminPanel({members,onAdd,onClose}){
  const [tab,setTab]=useState("list");
  const [f,setF]=useState({name:"",username:"",password:"",role:"Member",color:C.green});
  const [msg,setMsg]=useState("");
  function h(e){setF(x=>({...x,[e.target.name]:e.target.value}));}
  function create(){
    if(!f.name||!f.username||!f.password)return setMsg("Fill all fields.");
    if(members.find(m=>m.username===f.username))return setMsg("Username already taken.");
    onAdd({id:"s"+Date.now(),type:"php",name:f.name,username:f.username,password:f.password,
      avatar:f.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase(),
      color:f.color,role:f.role,points:0,joined:new Date().toLocaleDateString("en",{month:"short",year:"numeric"}),
      tasks:0,events:0,bio:"",badges:["🌱 New Member"],appliedEvents:[],acceptedEvents:[],notifications:[]});
    setF({name:"",username:"",password:"",role:"Member",color:C.green});
    setMsg("✅ Member created!");setTimeout(()=>setMsg(""),3000);
  }
  return(
    <Modal onClose={onClose}>
      <div style={{fontFamily:"Nunito,sans-serif"}}>
        <div style={{padding:"20px 24px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h2 style={{fontWeight:900,fontSize:18}}>⚙️ Admin Panel</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:C.muted}}>✕</button>
        </div>
        <div style={{display:"flex",gap:4,padding:"12px 24px 0",flexWrap:"wrap"}}>
          {[{v:"list",l:"Members"},{v:"create",l:"+ Create Member"}].map(t=>(
            <button key={t.v} onClick={()=>setTab(t.v)} style={{padding:"7px 14px",borderRadius:8,border:"none",background:tab===t.v?C.red:C.bg,color:tab===t.v?"#fff":C.muted,fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>{t.l}</button>
          ))}
        </div>
        <div style={{padding:"16px 24px 24px"}}>
          {tab==="list"&&<div>
            {members.map(m=>(
              <div key={m.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
                <Av i={m.avatar} c={m.color} s={36}/>
                <div style={{flex:1}}><div style={{fontWeight:800,fontSize:14}}>{m.name}</div><div style={{fontSize:12,color:C.muted}}>@{m.username} · {m.role}</div></div>
                <span style={{background:C.yellow+"20",color:"#8B6914",borderRadius:8,padding:"3px 8px",fontSize:12,fontWeight:800}}>{m.points} pts</span>
              </div>
            ))}
          </div>}
          {tab==="create"&&<div>
            <div style={{fontWeight:800,marginBottom:14}}>Create PHP Member Account</div>
            <Inp label="Full Name" name="name" value={f.name} onChange={h} placeholder="Member's full name"/>
            <Inp label="Username" name="username" value={f.username} onChange={h} placeholder="e.g. nour.ahmed"/>
            <Inp label="Password" name="password" type="password" value={f.password} onChange={h} placeholder="Set a password"/>
            <div style={{marginBottom:14}}>
              <label style={{display:"block",fontWeight:800,fontSize:13,marginBottom:5}}>Role</label>
              <select name="role" value={f.role} onChange={h} style={{width:"100%",padding:"10px 14px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:14,fontFamily:"Nunito,sans-serif",outline:"none",background:C.bg}}>
                {["New Member","Member","Senior Member","Team Leader"].map(r=><option key={r}>{r}</option>)}
              </select>
            </div>
            <div style={{marginBottom:16}}>
              <label style={{display:"block",fontWeight:800,fontSize:13,marginBottom:8}}>Profile Color</label>
              <div style={{display:"flex",gap:10}}>
                {[C.green,C.blue,C.yellow,C.red].map(col=>(
                  <div key={col} onClick={()=>setF(x=>({...x,color:col}))} style={{width:32,height:32,borderRadius:"50%",background:col,cursor:"pointer",border:`3px solid ${f.color===col?C.text:"transparent"}`}}/>
                ))}
              </div>
            </div>
            {msg&&<div style={{background:msg.startsWith("✅")?C.green+"15":C.red+"15",color:msg.startsWith("✅")?C.green:C.red,borderRadius:10,padding:"8px 14px",fontSize:13,fontWeight:700,marginBottom:12}}>{msg}</div>}
            <Btn color={C.red} onClick={create} style={{width:"100%",padding:"12px 0",fontSize:15}}>Create Account</Btn>
          </div>}
        </div>
      </div>
    </Modal>
  );
}

/* ══════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════ */
export default function App(){
  const [user,setUser]=useState(null);
  const [admins,setAdmins]=useState([SEED_ADMIN]);
  const [members,setMembers]=useState(SEED_MEMBERS);
  const [tasks,setTasks]=useState(SEED_TASKS);
  const [events,setEvents]=useState(SEED_EVENTS);
  const [posts,setPosts]=useState(SEED_POSTS);
  const [proposals,setProposals]=useState(SEED_EVENT_PROPOSALS);
  // Per-user notifications stored in members state; admin has own notifs
  const [adminNotifs,setAdminNotifs]=useState([
    {id:"an1",icon:"📋",text:"Kareem Salah submitted: Mental Health Awareness Poster",time:"5h ago",read:false},
    {id:"an2",icon:"📋",text:"Hana Mostafa submitted: Welcome Week Volunteer",time:"6h ago",read:false},
    {id:"an3",icon:"💡",text:"Kareem Salah proposed: Anti-Bullying Awareness Day",time:"1d ago",read:false},
  ]);

  const [page,setPage]=useState("home");
  const [showNotif,setShowNotif]=useState(false);
  const [adminOpen,setAdminOpen]=useState(false);
  const [viewProfile,setViewProfile]=useState(null);
  const [taskUpload,setTaskUpload]=useState(false);
  const [manageEvent,setManageEvent]=useState(null);
  const [composing,setComposing]=useState(false);
  const [draft,setDraft]=useState({text:"",type:"post"});
  const [menuOpen,setMenu]=useState(false);

  // Notifications for current user
  const myNotifs=user?.type==="admin"?adminNotifs:(members.find(m=>m.id===user?.id)?.notifications||[]);

  function pushNotif(userId,notif){
    if(userId==="admin"){setAdminNotifs(n=>[...n,{id:"n"+Date.now(),...notif,read:false}]);return;}
    setMembers(ms=>ms.map(m=>m.id===userId?{...m,notifications:[...m.notifications,{id:"n"+Date.now(),...notif,read:false}]}:m));
  }
  function clearNotifs(){
    if(user?.type==="admin"){setAdminNotifs([]);return;}
    setMembers(ms=>ms.map(m=>m.id===user.id?{...m,notifications:[]}:m));
  }

  function login(u,isNew=false){if(isNew)setAdmins(a=>[...a,u]);setUser(u);setPage("home");}
  function logout(){setUser(null);setMenu(false);}
  function addMember(m){setMembers(ms=>[...ms,m]);}

  // Task actions
  function submitTask(task){
    setTasks(ts=>[task,...ts]);
    setMembers(ms=>ms.map(m=>m.id===user.id?{...m,tasks:m.tasks+1}:m));
    pushNotif("admin",{icon:"📋",text:`${user.name} submitted: ${task.title}`,time:"just now"});
  }
  function rateTask(id,status,rating,points,feedback){
    const t=tasks.find(x=>x.id===id);
    setTasks(ts=>ts.map(x=>x.id===id?{...x,status,rating,points,feedback}:x));
    if(status==="approved"){
      setMembers(ms=>ms.map(m=>m.id===t.authorId?{...m,points:m.points+points}:m));
      pushNotif(t.authorId,{icon:"✅",text:`Your task "${t.title}" was approved! +${points} pts (${rating}⭐)`,time:"just now"});
    } else {
      pushNotif(t.authorId,{icon:"❌",text:`Your task "${t.title}" was declined. Check feedback.`,time:"just now"});
    }
  }

  // Like/comment on both tasks and posts
  function likeItem(id,kind){
    if(kind==="task")setTasks(ts=>ts.map(t=>{if(t.id!==id)return t;const l=t.likes.includes(user.id);return{...t,likes:l?t.likes.filter(x=>x!==user.id):[...t.likes,user.id]};}));
    else setPosts(ps=>ps.map(p=>{if(p.id!==id)return p;const l=p.likes.includes(user.id);return{...p,likes:l?p.likes.filter(x=>x!==user.id):[...p.likes,user.id]};}));
  }
  function commentItem(id,text,kind){
    const nc={id:"c"+Date.now(),authorId:user.id,authorName:user.name,authorAvatar:user.avatar,authorColor:user.color,text};
    if(kind==="task")setTasks(ts=>ts.map(t=>t.id===id?{...t,comments:[...t.comments,nc]}:t));
    else setPosts(ps=>ps.map(p=>p.id===id?{...p,comments:[...p.comments,nc]}:p));
  }

  // Event actions
  function applyEvent(eid){
    setEvents(es=>es.map(e=>e.id===eid?{...e,applicants:[...e.applicants,user.id],filled:e.filled+1}:e));
    pushNotif("admin",{icon:"📅",text:`${user.name} applied to an event`,time:"just now"});
  }
  function acceptApplicant(eid,uid){
    setEvents(es=>es.map(e=>e.id===eid?{...e,accepted:[...e.accepted,uid]}:e));
    const ev=events.find(e=>e.id===eid);
    pushNotif(uid,{icon:"🎉",text:`You were accepted to "${ev?.title}"!`,time:"just now"});
  }

  // Proposal actions
  function submitProposal(p){
    setProposals(ps=>[...ps,p]);
    pushNotif("admin",{icon:"💡",text:`${user.name} proposed event: ${p.title}`,time:"just now"});
  }
  function rateProposal(id,status){
    const p=proposals.find(x=>x.id===id);
    setProposals(ps=>ps.map(x=>x.id===id?{...x,status}:x));
    pushNotif(p.authorId,{icon:status==="approved"?"🎉":"❌",text:`Your event proposal "${p.title}" was ${status}!`,time:"just now"});
  }

  // Post actions
  function submitPost(){
    if(!draft.text.trim())return;
    setPosts(ps=>[{id:"p"+Date.now(),authorId:user.id,authorName:user.name,authorAvatar:user.avatar,authorColor:user.color,time:"just now",type:draft.type,content:draft.text,likes:[],comments:[],pinned:user.type==="admin",tags:[]},...ps]);
    setDraft({text:"",type:"post"});setComposing(false);
  }

  const notifCount=myNotifs.filter(n=>!n.read).length;
  const NAV=[{id:"home",icon:"🏠",label:"Home"},{id:"tasks",icon:"📋",label:"Tasks"},{id:"events",icon:"📅",label:"Events"},{id:"members",icon:"👥",label:"Members"}];

  if(!user)return <Auth onLogin={login} members={members} admins={admins}/>;

  return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"Nunito,sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body,#root{width:100%;min-height:100vh;background:${C.bg}}
        body{background:${C.bg}}
        input,textarea,select{color:#050505 !important;background:#ffffff !important;}
        input::placeholder,textarea::placeholder{color:#65676B !important}
        button{cursor:pointer;transition:opacity .15s}
        button:hover:not(:disabled){opacity:.85}
        .sl,.sr{display:block}
        @media(max-width:900px){.sl,.sr{display:none!important}}
        @media(max-width:480px){.nlbl{display:none}}
      `}</style>

      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:500,background:C.white,boxShadow:"0 1px 6px #0001",display:"flex",alignItems:"center",padding:"0 8px",height:56,gap:4}}>
        <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0,marginRight:4}}>
          <img src={LOGO} alt="PHP" style={{height:36,objectFit:"contain"}} onError={e=>e.target.style.display="none"}/>
          <span style={{fontWeight:900,fontSize:14,whiteSpace:"nowrap"}} className="nlbl">PHP Portal</span>
        </div>
        <div style={{display:"flex",flex:1,justifyContent:"center",gap:0}}>
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>setPage(n.id)} style={{background:"none",border:"none",padding:"16px 10px",fontSize:13,color:page===n.id?C.blue:C.muted,borderBottom:`3px solid ${page===n.id?C.blue:"transparent"}`,fontWeight:800,fontFamily:"Nunito,sans-serif",display:"flex",alignItems:"center",gap:4,whiteSpace:"nowrap"}}>
              {n.icon}<span className="nlbl">{n.label}</span>
            </button>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,marginLeft:"auto"}}>
          {user.type==="admin"&&<button onClick={()=>setAdminOpen(true)} style={{background:C.red+"15",border:"none",borderRadius:8,color:C.red,fontWeight:800,fontSize:12,padding:"6px 10px",fontFamily:"Nunito,sans-serif",whiteSpace:"nowrap"}}>⚙️ <span className="nlbl">Admin</span></button>}
          <button onClick={()=>setShowNotif(v=>!v)} style={{background:showNotif?C.blue+"15":C.bg,border:"none",borderRadius:"50%",width:36,height:36,fontSize:18,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            🔔{notifCount>0&&<span style={{position:"absolute",top:1,right:1,background:C.red,color:"#fff",borderRadius:"50%",width:15,height:15,fontSize:9,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center"}}>{notifCount}</span>}
          </button>
          <div style={{position:"relative",flexShrink:0}}>
            <div onClick={()=>setMenu(m=>!m)} style={{cursor:"pointer"}}><Av i={user.avatar} c={user.color} s={34}/></div>
            {menuOpen&&<div style={{position:"absolute",right:0,top:42,background:C.white,borderRadius:12,boxShadow:"0 4px 24px #0003",minWidth:180,zIndex:999,overflow:"hidden",border:`1px solid ${C.border}`}}>
              <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`}}>
                <div style={{fontWeight:800,fontSize:14}}>{user.name}</div>
                <div style={{fontSize:12,color:C.muted}}>{user.type==="admin"?"Administrator":user.role}</div>
              </div>
              {user.type==="php"&&<button onClick={()=>{setViewProfile(members.find(m=>m.id===user.id));setMenu(false);}} style={{width:"100%",background:"none",border:"none",padding:"10px 16px",textAlign:"left",fontFamily:"Nunito,sans-serif",fontSize:13,fontWeight:700,color:C.text}}>👤 My Profile</button>}
              <button onClick={logout} style={{width:"100%",background:"none",border:"none",padding:"10px 16px",textAlign:"left",fontFamily:"Nunito,sans-serif",fontSize:13,fontWeight:700,color:C.red}}>🚪 Log Out</button>
            </div>}
          </div>
        </div>
      </nav>

      {showNotif&&<NotifPanel notifs={myNotifs} onClose={()=>setShowNotif(false)} onClear={clearNotifs}/> }

      {/* LAYOUT */}
      <div style={{width:"100%",padding:"20px 16px 32px",display:"flex",gap:16}}>

        {/* Left sidebar */}
        <aside className="sl" style={{width:260,flexShrink:0}}>
          <Card style={{marginBottom:12}}>
            <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:14}}>
              <Av i={user.avatar} c={user.color} s={44}/>
              <div><div style={{fontWeight:800,fontSize:14}}>{user.name}</div><div style={{fontSize:12,color:user.color,fontWeight:700}}>{user.type==="admin"?"Administrator":user.role}</div></div>
            </div>
            {user.type==="php"&&[{l:"Points",v:(members.find(m=>m.id===user.id)||user).points,c:C.yellow},{l:"Tasks Done",v:(members.find(m=>m.id===user.id)||user).tasks,c:C.blue},{l:"Events",v:(members.find(m=>m.id===user.id)||user).events,c:C.green}].map(s=>(
              <div key={s.l} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.border}`,fontSize:13,fontWeight:700}}>
                <span style={{color:C.muted}}>{s.l}</span><span style={{color:s.c}}>{s.v}</span>
              </div>
            ))}
            {user.type==="php"&&<button onClick={()=>{setViewProfile(members.find(m=>m.id===user.id));}} style={{width:"100%",marginTop:12,background:C.blue+"12",border:`1.5px solid ${C.blue}30`,borderRadius:8,padding:"8px 0",color:C.blue,fontWeight:800,fontSize:13,fontFamily:"Nunito,sans-serif"}}>👤 My Profile</button>}
          </Card>
          <Card style={{padding:"10px 0"}}>
            {NAV.map(n=>(
              <button key={n.id} onClick={()=>setPage(n.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",background:page===n.id?C.blue+"12":"none",border:"none",padding:"10px 16px",color:page===n.id?C.blue:C.text,fontWeight:800,fontSize:14,fontFamily:"Nunito,sans-serif",borderRadius:8}}>
                <span style={{fontSize:18}}>{n.icon}</span>{n.label}
              </button>
            ))}
          </Card>
        </aside>

        {/* CENTER */}
        <main style={{flex:1,minWidth:0}}>

          {/* HOME */}
          {page==="home"&&<>
            <Card style={{marginBottom:12}}>
              {!composing?(
                <div>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    <Av i={user.avatar} c={user.color} s={40}/>
                    <div onClick={()=>setComposing(true)} style={{flex:1,background:C.bg,borderRadius:24,padding:"10px 16px",color:C.muted,cursor:"text",fontSize:14,fontWeight:600,border:`1.5px solid ${C.border}`}}>What's on your mind?</div>
                  </div>
                  <div style={{display:"flex",gap:6,marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`,flexWrap:"wrap"}}>
                    {user.type==="php"&&<button onClick={()=>setTaskUpload(true)} style={{background:C.green+"12",color:C.green,border:`1.5px solid ${C.green}30`,borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:800,fontFamily:"Nunito,sans-serif"}}>📋 Submit Task</button>}
                    {user.type==="php"&&<button onClick={()=>{setPage("events");}} style={{background:C.blue+"12",color:C.blue,border:`1.5px solid ${C.blue}30`,borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:800,fontFamily:"Nunito,sans-serif"}}>📅 Propose Event</button>}
                  </div>
                </div>
              ):(
                <div>
                  <div style={{display:"flex",gap:10}}>
                    <Av i={user.avatar} c={user.color} s={40}/>
                    <textarea value={draft.text} onChange={e=>setDraft(d=>({...d,text:e.target.value}))} placeholder="Share something with the program…" rows={3}
                      style={{flex:1,padding:"10px 14px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:14,fontFamily:"Nunito,sans-serif",resize:"none",outline:"none",background:C.bg}}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"flex-end",gap:6,marginTop:8}}>
                    <Btn color={C.muted} outline onClick={()=>setComposing(false)} style={{padding:"7px 14px"}}>Cancel</Btn>
                    <Btn color={C.green} onClick={submitPost} disabled={!draft.text.trim()}>Post</Btn>
                  </div>
                </div>
              )}
            </Card>
            {posts.map(p=><PostCard key={p.id} post={p} currentUser={user} onLike={id=>likeItem(id,"post")} onComment={(id,t)=>commentItem(id,t,"post")}/>)}
          </>}

          {/* TASKS */}
          {page==="tasks"&&<TasksPage tasks={tasks} currentUser={user} members={members}
            onLike={id=>likeItem(id,"task")} onComment={(id,t)=>commentItem(id,t,"task")}
            onRate={rateTask} onSubmitTask={()=>setTaskUpload(true)}/>}

          {/* EVENTS */}
          {page==="events"&&<EventsPage events={events} proposals={proposals} currentUser={user} members={members}
            onApply={applyEvent} onManageEvent={setManageEvent}
            onSubmitProposal={submitProposal} onRateProposal={rateProposal}/>}

          {/* MEMBERS */}
          {page==="members"&&<MembersPage members={members} onView={m=>setViewProfile(m)}/>}

          {/* PROFILE (my page) */}
          {page==="profile"&&viewProfile&&<ProfilePage member={viewProfile} allTasks={tasks} allEvents={events} onBack={()=>setPage("home")}/>}
        </main>

        {/* Right sidebar */}
        <aside className="sr" style={{width:280,flexShrink:0}}>
          <Card style={{marginBottom:12}}>
            <div style={{fontWeight:900,fontSize:15,marginBottom:14}}>🏆 Leaderboard</div>
            {[...members].sort((a,b)=>b.points-a.points).map((m,i)=>(
              <div key={m.id} onClick={()=>setViewProfile(m)} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,cursor:"pointer"}}>
                <span style={{width:20,fontSize:15,textAlign:"center"}}>{["🥇","🥈","🥉","4️⃣","5️⃣"][i]}</span>
                <Av i={m.avatar} c={m.color} s={30}/>
                <div style={{flex:1}}><div style={{fontWeight:800,fontSize:13}}>{m.name.split(" ")[0]}</div><div style={{fontSize:11,color:C.muted}}>{m.points} pts</div></div>
              </div>
            ))}
            <Btn color={C.blue} outline onClick={()=>setPage("members")} style={{width:"100%",marginTop:6,padding:"7px 0",fontSize:12}}>See All</Btn>
          </Card>
          <Card>
            <div style={{fontWeight:900,fontSize:15,marginBottom:12}}>📅 Upcoming Events</div>
            {events.map(e=>(
              <div key={e.id} style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                  <div><div style={{fontWeight:800,fontSize:13}}>{e.title}</div><div style={{fontSize:11,color:C.muted}}>{e.month} {e.day}</div></div>
                  <Tag label={e.category} color={e.color}/>
                </div>
                <Bar v={e.filled} m={e.slots} c={e.color}/>
                <div style={{fontSize:11,color:C.muted,marginTop:3}}>{e.filled}/{e.slots}</div>
              </div>
            ))}
          </Card>
        </aside>
      </div>

      {/* MODALS */}
      {taskUpload&&<TaskUploadModal user={user} onClose={()=>setTaskUpload(false)} onSubmit={submitTask}/>}
      {adminOpen&&<AdminPanel members={members} onAdd={addMember} onClose={()=>setAdminOpen(false)}/>}
      {manageEvent&&<ManageEventModal event={manageEvent} members={members} onClose={()=>setManageEvent(null)} onAccept={acceptApplicant}/>}
      {viewProfile&&page!=="profile"&&<Modal onClose={()=>setViewProfile(null)} wide>
        <ProfilePage member={viewProfile} allTasks={tasks} allEvents={events} onBack={()=>setViewProfile(null)}/>
      </Modal>}
    </div>
  );
}