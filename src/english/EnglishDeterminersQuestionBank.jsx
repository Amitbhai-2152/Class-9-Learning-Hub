const q=(question,options,answer,explanation)=>[question,options,answer,explanation];

export const DETERMINERS_BANKS={
 practice:[
  q('I saw ___ elephant near the river.',['a','an','the','no article'],1,'“Elephant” begins with a vowel sound, so “an” is used.'),
  q('There is not ___ milk left in the jug.',['many','few','much','several'],2,'“Milk” is uncountable, so “much” fits.'),
  q('___ students in my class submitted the project.',['Much','Each','Every','All the'],3,'“Students” is plural, so “all the” fits.'),
  q('She has ___ friends in the new school.',['a little','much','a few','an'],2,'“Friends” is plural countable, so “a few” fits.'),
  q('I need ___ information before deciding.',['a few','many','some','several'],2,'“Information” is uncountable; “some” is suitable.'),
  q('___ of the two answers is acceptable.',['Both','Each','Much','Many'],1,'“Each” refers to the members individually and takes a singular noun/verb construction.'),
  q('Choose the correct phrase.',['these book','this books','these books','this books are'],2,'“These” is plural, so it takes the plural countable noun “books”.'),
  q('We have ___ water for everyone.',['a few','enough','many','several'],1,'“Water” is uncountable, and “enough” correctly expresses sufficient quantity.'),
  q('___ child must bring a notebook.',['Every','Many','Several','Much'],0,'“Every” is followed by a singular countable noun: “every child”.'),
  q('I bought ___ apples because only two were needed.',['a little','a few','much','an'],1,'“Apples” is plural countable, so “a few” is correct.'),
  q('Choose the correct article: ___ university student spoke to us.',['an','a','the only possible','no article'],1,'“University” begins with the consonant sound /juː/, so “a university” is correct.'),
  q('___ books are useful sources of knowledge.',['The all','A','Books','Much'],2,'Plural nouns used in a general sense can take the zero article: “Books are useful…”.')
 ],
 challenge:[
  q('He is ___ honest officer.',['a','an','the','some'],1,'“Honest” begins with a vowel sound because the h is not pronounced.'),
  q('There were ___ people at the bus stop than expected.',['less','little','fewer','much'],2,'“People” is plural countable, so “fewer” is the standard school-grammar choice.'),
  q('I have read ___ books you recommended.',['a','an','the','much'],2,'The books are specifically identified by the relative clause “you recommended”.'),
  q('We have ___ time, so we must hurry.',['a little','a few','many','several'],0,'“Time” is uncountable; “a little” means a small amount remains.'),
  q('___ child must bring ___ notebook tomorrow.',['Every / a','Much / an','Several / a','Each / many'],0,'“Every child” is singular, and “a notebook” is a singular countable noun.'),
  q('Choose the incorrect phrase.',['an umbrella','a university','an hour','a honest man'],3,'“Honest” begins with a vowel sound, so it should be “an honest man”.'),
  q('There is ___ sugar in the jar, but it is not enough for the recipe.',['a few','a little','many','several'],1,'“Sugar” is uncountable, so “a little” is the correct quantity expression.'),
  q('Which sentence is correct?',['Each students has a pen.','Each student have a pen.','Each student has a pen.','Each of student has a pen.'],2,'“Each” takes a singular countable noun and a singular verb: “Each student has…”.'),
  q('Choose the best option: “___ of the two roads leads to the village.”',['Both','Neither','Many','Much'],1,'“Neither” refers to not one of two, so it takes a singular noun/verb construction here.'),
  q('Which sentence uses “some” naturally in a question?',['Could I have some water, please?','Did you see some not?','Is some students absent?','Some do you want?'],0,'“Some” is natural in a polite request or offer: “Could I have some water, please?”'),
  q('Choose the correct sentence.',['This two books are mine.','These two books are mine.','These two book are mine.','Those two book is mine.'],1,'“These” and “two books” are both plural.'),
  q('Which determiner best completes: “___ information was given to the students.”',['Many','Several','Some','A few'],2,'“Information” is uncountable, so “some information” is correct.'),
  q('Choose the better school-grammar sentence.',['She has less mistakes than me.','She has fewer mistakes than me.','She has little mistakes than me.','She has fewest mistakes than me.'],1,'“Mistakes” is plural countable, so “fewer” is used in the comparison.'),
  q('Which phrase refers to a specific, already identified noun?',['a book','books','the book on the desk','some books'],2,'“The book on the desk” identifies a particular book through context/location.'),
  q('Choose the correct noun phrase.',['my a book','my book','mine book','my books a'],1,'A possessive determiner such as “my” comes directly before the noun: “my book”.')
 ],
 test:[
  q('___ of the advice was useful.',['Many','A few','Much','Several'],2,'“Advice” is uncountable, so “much” is correct in this school-grammar quantity contrast.'),
  q('He did not make ___ mistakes in the final draft.',['much','many','little','a little'],1,'“Mistakes” is plural countable, so “many” is correct.'),
  q('Which sentence is grammatically correct?',['There are much reasons to wait.','There is many reasons to wait.','There are a lot of reasons to wait.','There is a few reasons to wait.'],2,'“Reasons” is plural countable, and “a lot of” works naturally with it.'),
  q('___ book on the table belongs to me.',['A','An','The','Some'],2,'The location identifies a particular book, so “the” is appropriate.'),
  q('Choose the best correction: “She has less books than her sister.”',['She has fewer books than her sister.','She has few books than her sister.','She has little books than her sister.','She has lesser books than her sister.'],0,'“Books” is plural countable, so “fewer” is the standard school-grammar choice.'),
  q('Which pair is correct?',['much students / many water','many students / much water','many student / much waters','much students / many waters'],1,'“Students” is plural countable; “water” is uncountable.'),
  q('Choose the sentence with the correct article.',['He is an European student.','He is a European student.','He is the European student always.','He is European a student.'],1,'“European” begins with the consonant sound /j/, so “a European” is correct.'),
  q('Which sentence correctly expresses a general truth?',['The water is essential for life.','Water is essential for life.','A water is essential for life.','Many water are essential for life.'],1,'Uncountable “water” in a general sense takes the zero article.'),
  q('Choose the correct completion: “I have ___ money, but I can still buy the notebook.”',['a little','a few','many','several'],0,'“Money” is uncountable; “a little” means a small amount is available.'),
  q('Which sentence is correct?',['Both answer is correct.','Both answers are correct.','Both of answer are correct.','Both answers is correct.'],1,'“Both” is followed by a plural noun and plural verb.'),
  q('Choose the best option: “___ of the students has submitted the form.”',['All','Each','Many','Both'],1,'“Each of + plural noun” takes a singular verb in standard school grammar.'),
  q('Which noun phrase is correctly formed?',['those old houses','that old houses','those old house','these old house'],0,'“Those” is plural, so the noun must be plural: “those old houses”.'),
  q('Choose the correct sentence.',['Whose book is this?','Whose is this book? only if no noun follows','Whose book are this?','Whose books is this?'],0,'“Whose” can function as a determiner directly before a noun: “Whose book is this?”'),
  q('Which sentence uses the definite article most appropriately?',['I saw a dog. The dog was wet.','I saw the dog for the first time, so it must be unknown.','The dogs are useful in general.','A sun rises in the east.'],0,'The second mention refers back to the already identified dog.'),
  q('Choose the best correction: “Every students must submit their form.”',['Every student must submit their form.','Every students must submits their form.','Every student must submits their form.','Every student must submitted their form.'],0,'“Every” requires the singular noun “student”; after modal “must”, use the base verb “submit”.'),
  q('Which option correctly matches countability?',['many information','much information','a few information','several information'],1,'“Information” is uncountable, so “much information” is the valid pair.'),
  q('Which sentence has the correct determiner + noun combination?',['an advice','a useful advice','a piece of advice','many advice'],2,'“Advice” is uncountable; “a piece of advice” is the standard countable expression.'),
  q('Choose the correct translation: “हर छात्र के पास एक किताब है।”',['Every student has a book.','Every students have a book.','Each students has one book.','Many student has a book.'],0,'“हर छात्र” maps naturally to “every student”; the singular subject takes “has”.'),
  q('Which sentence best shows “few” rather than “a few”?',['Few students understood the difficult instruction.','A few students understood the difficult instruction.','Few water remained in the bottle.','A few information was useful.'],0,'“Few students” emphasizes that the number was small; the noun is plural countable.'),
  q('Final audit: which sentence is fully correct?',['An honest man gave me some useful advice.','A honest man gave me many useful advice.','An honest man gave me a few advice.','The honest man gave me much advices.'],0,'“An honest man” uses the vowel sound correctly, and “some useful advice” correctly treats “advice” as uncountable.')
 ]
};

export default DETERMINERS_BANKS;
