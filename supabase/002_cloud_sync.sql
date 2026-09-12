-- Cloud sync layer for authenticated Class 9 learners.
-- Run after 001_learning_progress.sql in the Supabase SQL editor.

alter table public.students add column if not exists full_name text;
alter table public.students add column if not exists email text;
alter table public.students add column if not exists class_label text not null default '9';

-- Canonical 174-topic catalog. The client uses the same subjectProgressRegistry.js ids/orders.
insert into public.subject_topics(subject_id,topic_id,title,topic_order) values
('math','math-01','संख्या पद्धति',1),('math','math-02','बहुपद',2),('math','math-03','निर्देशांक ज्यामिति',3),('math','math-04','दो चरों वाले रैखिक समीकरण',4),('math','math-05','यूक्लिड की ज्यामिति का परिचय',5),('math','math-06','रेखाएँ और कोण',6),('math','math-07','त्रिभुज',7),('math','math-08','चतुर्भुज',8),('math','math-09','समान्तर चतुर्भुजों और त्रिभुजों के क्षेत्रफल',9),('math','math-10','वृत्त',10),('math','math-11','रचनाएँ',11),('math','math-12','हीरोन का सूत्र',12),('math','math-13','पृष्ठीय क्षेत्रफल एवं आयतन',13),('math','math-14','सांख्यिकी',14),('math','math-15','प्रायिकता',15),
('science','science-01','हमारे आसपास के पदार्थ',1),('science','science-02','क्या हमारे आसपास के पदार्थ शुद्ध हैं?',2),('science','science-03','परमाणु एवं अणु',3),('science','science-04','परमाणु की संरचना',4),('science','science-05','जीवन की मौलिक इकाई — कोशिका',5),('science','science-06','ऊतक',6),('science','science-07','गति',7),('science','science-08','बल तथा गति के नियम',8),('science','science-09','गुरुत्वाकर्षण',9),('science','science-10','कार्य तथा ऊर्जा',10),('science','science-11','ध्वनि',11),('science','science-12','खाद्य संसाधनों में सुधार',12),('science','science-13','हम बीमार क्यों होते हैं',13),('science','science-14','प्राकृतिक संसाधन',14),('science','science-15','हमारा पर्यावरण',15),
('hindi','g1','कहानी का प्लॉट',1),('hindi','g2','भारत का पुरातन विद्यापीठ : नालंदा',2),('hindi','g3','ग्राम-गीत का मर्म',3),('hindi','g4','लाल पान की बेगम',4),('hindi','g5','भारतीय चित्रपट : मूक फिल्मों से सवाक फिल्मों तक',5),('hindi','g6','अष्टावक्र',6),('hindi','g7','टॉलस्टाय के घर में',7),('hindi','g8','पधारो म्हारे देश',8),('hindi','g9','रेल-यात्रा',9),('hindi','g10','निबंध',10),('hindi','g11','सूखी नदी का पुल',11),('hindi','g12','शिक्षा में हेर-फेर',12),
('hindi','k1','रैदास के पद',13),('hindi','k2','मंझन के पद',14),('hindi','k3','गुरु गोविंद सिंह के पद',15),('hindi','k4','पलक पाँवड़े',16),('hindi','k5','मैं नीर भरी दुःख की बदली',17),('hindi','k6','आ रही रवि के सवारी',18),('hindi','k7','पूरा हिन्दुस्तान मिलेगा',19),('hindi','k8','मेरा ईश्वर',20),('hindi','k9','रुको बच्चों',21),('hindi','k10','निम्मो की मौत',22),('hindi','k11','समुद्र',23),('hindi','k12','कुछ सवाल',24),
('hindi','v1','बिहार का लोकगायन',25),('hindi','v2','बिहार की संगीत साधना',26),('hindi','v3','बिहार में नृत्यकला',27),('hindi','v4','बिहार की चित्रकला',28),('hindi','v5','मधुबनी की चित्रकला',29),('hindi','v6','बिहार में नाट्यकला',30),('hindi','v7','बिहार का सिनेमा संसार',31),
('hindi','h-grammar-01','अपठित गद्यांश',32),('hindi','h-grammar-02','निबंध लेखन',33),('hindi','h-grammar-03','पत्र लेखन',34),('hindi','h-grammar-04','संवाद लेखन',35),('hindi','h-grammar-05','अनुच्छेद लेखन',36),('hindi','h-grammar-06','लिंग',37),('hindi','h-grammar-07','वचन',38),('hindi','h-grammar-08','काल',39),('hindi','h-grammar-09','वाच्य',40),('hindi','h-grammar-10','संधि',41),('hindi','h-grammar-11','समास',42),('hindi','h-grammar-12','पर्यायवाची/विलोम/श्रुतिसमभिन्नार्थक',43),('hindi','h-grammar-13','मुहावरे और अनेक शब्दों के लिए एक शब्द',44),
('sanskrit','sanskrit-01','ईशस्तुति:',1),('sanskrit','sanskrit-02','लोभविष्टः चक्रधरः',2),('sanskrit','sanskrit-03','यक्ष-युधिष्ठिर संवाद',3),('sanskrit','sanskrit-04','चत्वारो वेदाः',4),('sanskrit','sanskrit-05','संस्कृतस्य महिमा',5),('sanskrit','sanskrit-06','संस्कृतसाहित्ये पर्यावरणम्',6),('sanskrit','sanskrit-07','ज्ञानं भारः क्रियां विना',7),('sanskrit','sanskrit-08','नीतिपधानिः',8),('sanskrit','sanskrit-09','बिहारस्य सांस्कृतिकं वैभवम्',9),('sanskrit','sanskrit-10','ईद-महोत्सवः',10),('sanskrit','sanskrit-11','ग्राम्यजीवनम्',11),('sanskrit','sanskrit-12','वीर कूँवर सिंहः',12),('sanskrit','sanskrit-13','किशोराणां मनोविज्ञानम्',13),('sanskrit','sanskrit-14','राष्ट्रबोधः',14),('sanskrit','sanskrit-15','विश्ववन्दिता वैशाली',15),
('sst','sst-h1','भौगोलिक खोजें',1),('sst','sst-h2','अमेरिकी स्वतंत्रता संग्राम',2),('sst','sst-h3','फ्रांस की क्रांति',3),('sst','sst-h4','विश्व युद्धों का इतिहास',4),('sst','sst-h5','नाजीवाद',5),('sst','sst-h6','वन्य समाज और उपनिवेशवाद',6),('sst','sst-h7','शांति के प्रयास',7),('sst','sst-h8','कृषि और खेतीहर और समाज',8),('sst','sst-g1','स्थिति एवं विस्तार',9),('sst','sst-g2','भौतिक स्वरूप : संरचना एवं उच्चावच',10),('sst','sst-g3','अपवाह स्वरूप',11),('sst','sst-g4','जलवायु',12),('sst','sst-g5','प्राकृतिक वनस्पति एवं वन्य प्राणी',13),('sst','sst-g6','जनसंख्या',14),('sst','sst-g7','भारत के पड़ोसी देश',15),('sst','sst-g8','मानचित्र अध्ययन',16),('sst','sst-g9','क्षेत्रीय अध्ययन',17),('sst','sst-g10','आपदा प्रबंधन : एक परिचय',18),('sst','sst-g11','मानवी गलतियों के कारण घटित आपदाएं : नाभिकीय/जैविक/रासायनिक',19),('sst','sst-g12','सामान्य आपदाएँ : निवारण एवं नियंत्रण',20),('sst','sst-g13','समुदाय आधारित आपदा प्रबंधन',21),('sst','sst-c1','लोकतंत्र का क्रमिक विकास',22),('sst','sst-c2','लोकतंत्र क्या और क्यों?',23),('sst','sst-c3','संविधान निर्माण',24),('sst','sst-c4','चुनावी राजनीति',25),('sst','sst-c5','संसदीय लोकतंत्र की संस्थाएं',26),('sst','sst-c6','लोकतांत्रिक अधिकार',27),('sst','sst-e1','बिहार के एक गाँव की कहानी',28),('sst','sst-e2','मानव एक संसाधन',29),('sst','sst-e3','गरीबी',30),('sst','sst-e4','बेकारी',31),('sst','sst-e5','कृषि, खाद्यान्न सुरक्षा एवं गुणवत्ता',32),('sst','sst-e6','कृषक मजदूर',33),
('english','english-reader-01','I’m going to dance again',1),('english','english-reader-02','Scaling Great Heights',2),('english','english-reader-03','Saint Kabir',3),('english','english-reader-04','The eyes are not here',4),('english','english-reader-05','Ismat Chughtai: A woman with a difference',5),('english','english-reader-06','The accidental tourist',6),('english','english-reader-07','Saint Ravidas',7),('english','english-reader-08','Bharathipura',8),('english','english-prose-01','Dharam Juddha',9),('english','english-prose-02','Yayati',10),('english','english-prose-03','A Silent Revolution',11),('english','english-prose-04','Too Many People, Too Few Trees',12),('english','english-prose-05','Echo and Narcissus',13),('english','english-prose-06','The Shehnai of Bismillah Khan',14),('english','english-prose-07','Kathmandu',15),('english','english-prose-08','My Childhood',16),('english','english-prose-09','The Gift of the Magi',17),('english','english-poetry-01','The Grandmother',18),('english','english-poetry-02','On His Blindness',19),('english','english-poetry-03','Blow, Blow, Thou Winter Wind',20),('english','english-poetry-04','To Daffodils',21),('english','english-poetry-05','Sound',22),('english','english-poetry-06','Self Introduction',23),('english','english-poetry-07','I Am Like Grass',24),('english','english-poetry-08','Abraham Lincoln’s Letter to His Son’s Teacher',25),('english','english-skill-01','Tenses',26),('english','english-skill-02','Modals',27),('english','english-skill-03','Voice',28),('english','english-skill-04','Subject-Verb Agreement',29),('english','english-skill-05','Narration',30),('english','english-skill-06','Clauses',31),('english','english-skill-07','Determiners',32),('english','english-skill-08','Prepositions',33),('english','english-skill-09','Idioms',34),('english','english-skill-10','Translation',35),('english','english-skill-11','Paragraph / Essay',36),('english','english-skill-12','Composition',37),('english','english-skill-13','Formal Letter',38),('english','english-skill-14','Informal Letter',39),('english','english-skill-15','Notice Writing',40),('english','english-skill-16','Report Writing',41),('english','english-skill-17','Speech Writing',42),('english','english-skill-18','Message Writing',43),('english','english-skill-19','Factual Reading',44),('english','english-skill-20','Literary Reading',45),('english','english-skill-21','Poetry Reading',46),
('reasoning','reasoning-01','Number Series',1),('reasoning','reasoning-02','Alphabet Series',2),('reasoning','reasoning-03','Analogy',3),('reasoning','reasoning-04','Classification',4),('reasoning','reasoning-05','Coding-Decoding',5),('reasoning','reasoning-06','Direction & Blood Relations',6)
on conflict(subject_id,topic_id) do update set title=excluded.title,topic_order=excluded.topic_order;

create table if not exists public.xp_wallet (
  student_id uuid primary key references public.students(id) on delete cascade,
  total_xp bigint not null default 0 check(total_xp >= 0),
  lifetime_xp bigint not null default 0 check(lifetime_xp >= 0),
  daily_xp integer not null default 0 check(daily_xp >= 0),
  daily_goal integer not null default 100 check(daily_goal > 0),
  day date not null default current_date,
  streak integer not null default 1 check(streak >= 1),
  updated_at timestamptz not null default now()
);

create table if not exists public.xp_events (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  event_id text not null,
  amount integer not null check(amount > 0 and amount <= 100),
  source text not null,
  subject_id text,
  topic_id text,
  stage text,
  awarded_at timestamptz not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique(student_id,event_id)
);

create index if not exists xp_events_student_time_idx on public.xp_events(student_id,awarded_at desc);

alter table public.xp_wallet enable row level security;
alter table public.xp_events enable row level security;

drop policy if exists xp_wallet_self_select on public.xp_wallet;
create policy xp_wallet_self_select on public.xp_wallet for select using (exists(select 1 from public.students s where s.id=student_id and s.auth_user_id=auth.uid()));
drop policy if exists xp_wallet_self_insert on public.xp_wallet;
create policy xp_wallet_self_insert on public.xp_wallet for insert with check (exists(select 1 from public.students s where s.id=student_id and s.auth_user_id=auth.uid()));
drop policy if exists xp_wallet_self_update on public.xp_wallet;
create policy xp_wallet_self_update on public.xp_wallet for update using (exists(select 1 from public.students s where s.id=student_id and s.auth_user_id=auth.uid())) with check (exists(select 1 from public.students s where s.id=student_id and s.auth_user_id=auth.uid()));

drop policy if exists xp_events_self_select on public.xp_events;
create policy xp_events_self_select on public.xp_events for select using (exists(select 1 from public.students s where s.id=student_id and s.auth_user_id=auth.uid()));
drop policy if exists xp_events_self_insert on public.xp_events;
create policy xp_events_self_insert on public.xp_events for insert with check (exists(select 1 from public.students s where s.id=student_id and s.auth_user_id=auth.uid()));

drop policy if exists xp_events_self_update on public.xp_events;
create policy xp_events_self_update on public.xp_events for update using (exists(select 1 from public.students s where s.id=student_id and s.auth_user_id=auth.uid())) with check (exists(select 1 from public.students s where s.id=student_id and s.auth_user_id=auth.uid()));
