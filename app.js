const doctors=[
{name:'Dr. Ananya Sharma',spec:'General Physician',exp:'12 yrs',rating:'4.9',icon:'👩‍⚕️'},
{name:'Dr. Rahul Verma',spec:'Cardiologist',exp:'15 yrs',rating:'4.8',icon:'👨‍⚕️'},
{name:'Dr. Neha Singh',spec:'Dermatologist',exp:'9 yrs',rating:'4.9',icon:'👩‍⚕️'},
{name:'Dr. Arjun Mehta',spec:'Pediatrician',exp:'11 yrs',rating:'4.8',icon:'👨‍⚕️'},
{name:'Dr. Priya Nair',spec:'Gynecologist',exp:'13 yrs',rating:'4.9',icon:'👩‍⚕️'},
{name:'Dr. Vivek Rao',spec:'General Physician',exp:'8 yrs',rating:'4.7',icon:'👨‍⚕️'},
{name:'Dr. Meera Joshi',spec:'Dermatologist',exp:'10 yrs',rating:'4.8',icon:'👩‍⚕️'},
{name:'Dr. Karan Gupta',spec:'Cardiologist',exp:'17 yrs',rating:'4.9',icon:'👨‍⚕️'}];
let appointments=JSON.parse(localStorage.getItem('ss_appts')||'[]');
function renderDoctors(){const f=document.getElementById('speciality').value;const list=doctors.filter(d=>f==='all'||d.spec===f);document.getElementById('doctorGrid').innerHTML=list.map((d,i)=>`<article class="doctor"><div class="avatar">${d.icon}</div><h3>${d.name}</h3><p>${d.spec} · ${d.exp} experience</p><div class="rating">⭐ ${d.rating} <span style="color:#667878"> · Verified</span></div><button class="primary" onclick="openModal('appointment','${d.name}')">Consult</button></article>`).join('')}
function filterDoctors(){renderDoctors()}
function renderAppointments(){const el=document.getElementById('appointmentsList');if(!appointments.length){el.innerHTML='<div class="appt"><div class="datebox">📅</div><div><b>No upcoming appointments</b><small>Book a consultation with a specialist.</small></div><button onclick="openModal(\'appointment\')">Book now</button></div>';return}el.innerHTML=appointments.map(a=>`<div class="appt"><div class="datebox"><b>${new Date(a.date).getDate()}</b><small>${new Date(a.date).toLocaleString('en',{month:'short'})}</small></div><div><b>${a.doctor}</b><small>${a.time} · ${a.mode}</small></div><button onclick="startConsult()">Join</button></div>`).join('')}
function openModal(type,doctor){document.getElementById('modal').classList.add('show');document.getElementById('modal').setAttribute('aria-hidden','false');const sel=document.getElementById('doctorSelect');sel.innerHTML=doctors.map(d=>`<option ${doctor===d.name?'selected':''}>${d.name}</option>`).join('');document.getElementById('date').min=new Date().toISOString().split('T')[0];document.getElementById('date').value=document.getElementById('date').min}
function closeModal(){document.getElementById('modal').classList.remove('show')}
function saveAppointment(e){e.preventDefault();const a={doctor:document.getElementById('doctorSelect').value,date:document.getElementById('date').value,time:document.getElementById('time').value,mode:document.getElementById('mode').value};appointments.push(a);localStorage.setItem('ss_appts',JSON.stringify(appointments));closeModal();renderAppointments();toast('Appointment confirmed ✓');document.querySelector('#appointments').scrollIntoView({behavior:'smooth'})}
function startConsult(){toast('Demo consultation room: video/audio/chat controls would open here')}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove('show'),2600)}
renderDoctors();renderAppointments();
