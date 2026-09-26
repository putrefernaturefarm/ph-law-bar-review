-- ============================================================
-- PH LAW BAR REVIEW — SEED DATA (80 Questions)
-- ============================================================

INSERT INTO public.questions
  (content, answer, explanation, question_type, difficulty, level, subject, topic, source_article, source_citation, is_verified)
VALUES

-- ============================================================
-- CONSTITUTIONAL LAW (20 questions)
-- ============================================================
(
  'What is the doctrine of separation of powers and how does it operate in the 1987 Philippine Constitution?',
  'The doctrine of separation of powers divides governmental authority among three co-equal branches: (1) the Legislative (Congress — Art. VI), which makes laws; (2) the Executive (President — Art. VII), which enforces laws; and (3) the Judiciary (Supreme Court — Art. VIII), which interprets laws. Each branch is supreme within its own sphere and may not encroach upon the functions of the others.',
  'Separation of powers prevents tyranny by distributing authority. Each branch has enumerated powers; any act exceeding those powers is void. The system is reinforced by checks and balances (e.g., executive veto, legislative override, judicial review).',
  'definition', 'medium', 'bar_exam', 'Constitutional Law', 'Separation of Powers',
  'Articles VI, VII, VIII, 1987 Constitution',
  'Art. VI, VII, VIII, 1987 Philippine Constitution', true
),

(
  'What are the grounds for impeachment of constitutional officers under the 1987 Philippine Constitution?',
  'The grounds for impeachment under Section 2, Article XI are: (1) culpable violation of the Constitution; (2) treason; (3) bribery; (4) graft and corruption; (5) other high crimes; and (6) betrayal of public trust.',
  'The impeachable officers are: President, Vice-President, Members of the Supreme Court and constitutional commissions, and the Ombudsman. The House of Representatives has exclusive power to initiate impeachment; the Senate tries the case.',
  'enumeration', 'medium', 'bar_exam', 'Constitutional Law', 'Impeachment',
  'Section 2, Article XI, 1987 Constitution',
  'Sec. 2, Art. XI, 1987 Philippine Constitution', true
),

(
  'Distinguish between procedural due process and substantive due process.',
  'PROCEDURAL DUE PROCESS refers to the method or manner by which a law is enforced — it requires notice and an opportunity to be heard before a person is deprived of life, liberty, or property. SUBSTANTIVE DUE PROCESS, on the other hand, refers to the intrinsic validity of the law itself — it requires that the law must be fair, reasonable, and not arbitrary, regardless of how well the procedure is followed.',
  'Procedural = HOW it is done. Substantive = WHAT the law does. A law may pass procedural due process but still be struck down for violating substantive due process if it is unreasonable or oppressive.',
  'distinction', 'hard', 'bar_exam', 'Constitutional Law', 'Due Process',
  'Section 1, Article III, 1987 Constitution',
  'Sec. 1, Art. III, 1987 Philippine Constitution', true
),

(
  'What is the equal protection clause and when may the State validly classify persons or groups?',
  'The equal protection clause (Sec. 1, Art. III) guarantees that no person shall be denied the equal protection of the laws. Classification is valid if: (1) it rests on substantial distinctions; (2) it is germane to the purpose of the law; (3) it is not limited to existing conditions only; and (4) it applies equally to all members of the same class.',
  'These are the four requisites for valid classification laid down in People v. Cayat (68 Phil. 12). Without all four, the classification is discriminatory and unconstitutional.',
  'requisites', 'hard', 'bar_exam', 'Constitutional Law', 'Equal Protection',
  'Section 1, Article III, 1987 Constitution',
  'Sec. 1, Art. III; People v. Cayat, 68 Phil. 12', true
),

(
  'What is the "clear and present danger" test as applied to freedom of speech under the 1987 Constitution?',
  'The clear and present danger test allows the State to restrict freedom of speech only when the words used create a danger that is (1) CLEAR — not remote or speculative; and (2) PRESENT — imminent, not merely possible in the future. The substantive evil must be extremely serious and the degree of imminence extremely high before government may punish speech.',
  'Derived from Schenck v. United States and adopted in Philippine jurisprudence (e.g., Gonzales v. COMELEC). The test balances free speech against State interest in order and safety.',
  'definition', 'hard', 'bar_exam', 'Constitutional Law', 'Freedom of Speech',
  'Section 4, Article III, 1987 Constitution',
  'Sec. 4, Art. III, 1987 Philippine Constitution; Gonzales v. COMELEC, G.R. No. L-27833', true
),

(
  'Under the 1987 Constitution, who are natural-born citizens of the Philippines?',
  'Natural-born citizens are those who are citizens of the Philippines from birth WITHOUT NEED OF PERFORMING ANY ACT to acquire or perfect their Philippine citizenship. These include: (1) those born of Filipino fathers; (2) those born of Filipino mothers before the 1935 Constitution took effect who elected Filipino citizenship upon reaching the age of majority; and (3) those born after the 1935 Constitution whose fathers OR mothers were Filipino citizens.',
  'Under the 1987 Constitution (Art. IV, Sec. 2), natural-born citizenship attaches at birth without any positive act. This is the jus sanguinis principle — citizenship by blood, not by place of birth (jus soli).',
  'definition', 'medium', 'bar_exam', 'Constitutional Law', 'Citizenship',
  'Section 2, Article IV, 1987 Constitution',
  'Sec. 2, Art. IV, 1987 Philippine Constitution', true
),

(
  'When may the privilege of the writ of habeas corpus be suspended under the 1987 Constitution?',
  'The privilege of the writ of habeas corpus may be suspended only in cases of INVASION OR REBELLION, when the public safety requires it, and only by the President. The suspension does not extend to political offenses. Congress must review the suspension within 48 hours; it remains effective only with Congressional approval or until lifted. The Supreme Court may review the factual basis in an appropriate proceeding.',
  'Art. VII, Sec. 18 limits suspension to invasion or rebellion + public safety. The 48-hour review by Congress and SC judicial review are 1987 Constitution innovations absent in previous constitutions.',
  'definition', 'hard', 'bar_exam', 'Constitutional Law', 'Habeas Corpus',
  'Section 18, Article VII, 1987 Constitution',
  'Sec. 18, Art. VII, 1987 Philippine Constitution', true
),

(
  'What is the Writ of Amparo and what does it protect?',
  'The Writ of Amparo is a remedy available to any person whose right to life, liberty, and security is violated or threatened with violation by an unlawful act or omission of a public official or employee, or of a private individual or entity. It is primarily directed at extrajudicial killings and enforced disappearances.',
  'Established by A.M. No. 07-9-12-SC (2007). It is NOT a writ to recover custody of a minor or to challenge the legality of a detention (habeas corpus covers that). It focuses on life, liberty, and security violations.',
  'definition', 'medium', 'bar_exam', 'Constitutional Law', 'Writ of Amparo',
  'A.M. No. 07-9-12-SC, Rule on the Writ of Amparo',
  'Rule on the Writ of Amparo, A.M. No. 07-9-12-SC (2007)', true
),

(
  'What is the landmark Philippine case equivalent to Marbury v. Madison establishing judicial review?',
  'The Philippine equivalent is ANGARA v. ELECTORAL COMMISSION (63 Phil. 139, 1936). Justice Jose P. Laurel held that the Supreme Court has the power of judicial review — the authority to declare acts of the Legislative or Executive unconstitutional. This power is inherent in the courts and is implied by the existence of a written Constitution.',
  'Angara established that judicial review is not a usurpation of legislative or executive power, but a constitutional function of the judiciary to maintain constitutional supremacy. It predates the 1987 Constitution''s express recognition in Art. VIII, Sec. 1.',
  'case_doctrine', 'hard', 'bar_exam', 'Constitutional Law', 'Judicial Review',
  'Article VIII, Section 1, 1987 Constitution',
  'Angara v. Electoral Commission, 63 Phil. 139 (1936)', true
),

(
  'What are the emergency powers that Congress may grant to the President under the 1987 Constitution?',
  'Under Section 23(2), Article VI, Congress may grant the President emergency powers in times of war or other national emergency. The grant must be: (1) for a limited period; (2) subject to restrictions Congress may prescribe; and (3) exercised to carry out a declared national policy. Emergency powers automatically cease when the emergency no longer exists or when Congress withdraws them.',
  'Emergency powers are delegated legislative powers — a constitutional exception to the principle of non-delegation. They do not make the President a dictator; they are always subject to Congressional control and withdrawal.',
  'definition', 'medium', 'bar_exam', 'Constitutional Law', 'Emergency Powers',
  'Section 23(2), Article VI, 1987 Constitution',
  'Sec. 23(2), Art. VI, 1987 Philippine Constitution', true
),

(
  'What is the privilege speech doctrine under the 1987 Constitution?',
  'Under Section 11, Article VI, a Senator or Member of the House of Representatives shall not be questioned nor held liable in any other place for any speech or debate in the Congress or in any committee thereof. This privilege is absolute — no civil or criminal liability attaches for a legislative speech.',
  'The privilege is personal to the legislator, covers speeches made in Congress or committee hearings, and is designed to ensure free and fearless debate. It does not extend to republications made outside Congress (Osmena v. Pendatun).',
  'definition', 'medium', 'bar_exam', 'Constitutional Law', 'Privilege Speech',
  'Section 11, Article VI, 1987 Constitution',
  'Sec. 11, Art. VI, 1987 Philippine Constitution; Osmena v. Pendatun, 109 Phil. 863', true
),

(
  'What are the elements of double jeopardy under the 1987 Constitution?',
  'For double jeopardy to attach, the following must concur: (1) a valid complaint or information; (2) filed before a court of competent jurisdiction; (3) to which the accused has pleaded (arraignment); (4) the accused has been convicted, acquitted, or the case was dismissed without the express consent of the accused.',
  'Double jeopardy protects a person from being prosecuted twice for the same offense. If the accused moves to dismiss, the second jeopardy bar does not apply because consent is given. Dismissal "with prejudice" always bars re-filing.',
  'elements', 'hard', 'bar_exam', 'Constitutional Law', 'Double Jeopardy',
  'Section 21, Article III, 1987 Constitution',
  'Sec. 21, Art. III, 1987 Philippine Constitution', true
),

(
  'What is the right to counsel under the 1987 Constitution and when does it attach?',
  'Under Section 12, Article III, any person under investigation for the commission of an offense has the right to be informed of his right to remain silent and to have COMPETENT AND INDEPENDENT counsel preferably of his own choice. This right attaches from the moment of custodial investigation. If the person cannot afford counsel, the investigating officer must provide one.',
  'The right to counsel in custodial investigation was expanded by RA 7438 (1992). It is not merely a formal right — counsel must be effective, not a rubber stamp. An uncounseled admission during custodial investigation is inadmissible.',
  'definition', 'medium', 'bar_exam', 'Constitutional Law', 'Right to Counsel',
  'Section 12, Article III, 1987 Constitution',
  'Sec. 12, Art. III, 1987 Philippine Constitution; RA 7438', true
),

(
  'What is the right against self-incrimination and what does it cover?',
  'The right against self-incrimination (Sec. 17, Art. III) means that no person shall be COMPELLED to be a witness against himself. It covers testimonial or communicative evidence — a person cannot be forced to take the witness stand and testify to incriminating facts. It does NOT cover real or physical evidence such as blood tests, handwriting samples, or appearance in a police lineup.',
  'The key distinction is testimonial vs. real evidence. Compulsion of real evidence is generally allowed (Beltran v. Samson, 53 Phil. 570). The right also protects non-parties called as witnesses who may be incriminated by their own testimony.',
  'definition', 'hard', 'bar_exam', 'Constitutional Law', 'Right Against Self-Incrimination',
  'Section 17, Article III, 1987 Constitution',
  'Sec. 17, Art. III, 1987 Philippine Constitution; Beltran v. Samson, 53 Phil. 570', true
),

(
  'What is the doctrine of constitutional supremacy?',
  'The doctrine of constitutional supremacy means that the Constitution is the supreme, fundamental law of the land. All other laws, executive acts, and judicial decisions must conform to the Constitution. Any law or official act that is inconsistent with the Constitution is void and of no effect from the time of its enactment.',
  'This doctrine flows from the written nature of the Philippine Constitution. It is enforced through judicial review (Art. VIII, Sec. 1), which gives courts the power to invalidate unconstitutional acts. The Constitution is the supreme expression of the sovereign will of the people.',
  'definition', 'easy', 'bar_exam', 'Constitutional Law', 'Constitutional Supremacy',
  'Article VIII, Section 1, 1987 Constitution',
  'Art. VIII, Sec. 1, 1987 Philippine Constitution', true
),

(
  'Give examples of the system of checks and balances in the 1987 Philippine Constitution.',
  'Examples of checks and balances: (1) The President may veto legislation passed by Congress, but Congress may override the veto by 2/3 vote (Art. VI, Sec. 27); (2) The President nominates justices to the Supreme Court through the JBC, but the Commission on Appointments confirms executive appointments; (3) Congress may impeach the President; (4) The Senate must concur in treaties the President ratifies; (5) The Supreme Court may declare executive acts unconstitutional; (6) Congress may remove justices through impeachment.',
  'Checks and balances prevent any one branch from becoming supreme. Each branch has tools to limit the others, thereby maintaining the balance of power the Constitution intends.',
  'enumeration', 'medium', 'bar_exam', 'Constitutional Law', 'Checks and Balances',
  'Articles VI, VII, VIII, 1987 Constitution',
  'Art. VI, VII, VIII, 1987 Philippine Constitution', true
),

(
  'What is the plenary power of Congress under the 1987 Constitution?',
  'Congress possesses plenary legislative power — the authority to make, alter, or repeal laws on any subject not prohibited by the Constitution. This power is comprehensive and unlimited except by the Constitution itself. Congress may legislate on any matter affecting the public interest, including the imposition of taxes, appropriation of public funds, regulation of commerce, and creation of public offices.',
  'Plenary means complete and absolute within constitutional limits. The power is limited by (1) constitutional provisions (Bill of Rights, prohibitions); (2) the non-delegation doctrine (legislative power cannot be delegated except to the President in emergencies and to LGUs); and (3) judicial review.',
  'definition', 'medium', 'bar_exam', 'Constitutional Law', 'Legislative Power',
  'Article VI, Section 1, 1987 Constitution',
  'Art. VI, Sec. 1, 1987 Philippine Constitution', true
),

(
  'What is the veto power of the President and how may Congress override it?',
  'Under Section 27, Article VI, if the President does not communicate his veto to Congress within thirty (30) days after receipt of the bill, it shall become a law as if signed. The President may veto the bill in its entirety or exercise an ITEM VETO over appropriation, revenue, and tariff bills. Congress may override the veto by a vote of at least two-thirds (2/3) of all the members of each House.',
  'The item veto applies only to appropriation, revenue, or tariff bills. For all other bills, veto is all-or-nothing. A pocket veto (silence beyond 30 days) does NOT operate in the Philippines — inaction makes the bill law.',
  'definition', 'medium', 'bar_exam', 'Constitutional Law', 'Veto Power',
  'Section 27, Article VI, 1987 Constitution',
  'Sec. 27, Art. VI, 1987 Philippine Constitution', true
),

(
  'How are treaties ratified under the 1987 Philippine Constitution?',
  'Under Section 21, Article VII, no treaty or international agreement shall be valid and effective unless concurred in by at least two-thirds (2/3) of all the Members of the Senate. The President has the power to negotiate and sign treaties; but they do not take binding domestic effect until Senate concurrence is obtained.',
  'Treaties binding the Philippines require Senate concurrence. Executive agreements, however, do not require Senate concurrence and are concluded by the President alone. The distinction matters for domestic enforceability.',
  'procedure', 'medium', 'bar_exam', 'Constitutional Law', 'Treaty Ratification',
  'Section 21, Article VII, 1987 Constitution',
  'Sec. 21, Art. VII, 1987 Philippine Constitution', true
),

(
  'What is the doctrine of state immunity from suit under the 1987 Constitution?',
  'Under Section 3, Article XVI, the State may not be sued without its consent. This is the principle of sovereign immunity or non-suability of the State. The State may waive this immunity either expressly (by law) or impliedly (by entering into commercial contracts). When the State engages in proprietary acts (jure gestionis), rather than governmental acts (jure imperii), it is deemed to have waived immunity.',
  'The doctrine is rooted in the maxim "the king can do no wrong." Philippine courts have relaxed the doctrine when the State acts commercially. Congress can waive immunity by passing special laws authorizing suits against the government.',
  'definition', 'hard', 'bar_exam', 'Constitutional Law', 'State Immunity',
  'Section 3, Article XVI, 1987 Constitution',
  'Sec. 3, Art. XVI, 1987 Philippine Constitution', true
),

-- ============================================================
-- CIVIL LAW (20 questions)
-- ============================================================
(
  'What are the essential requisites of a valid contract under the Civil Code of the Philippines?',
  'Under Article 1318 of the Civil Code, the following are essential requisites of a contract: (1) CONSENT of the contracting parties; (2) OBJECT certain which is the subject matter of the contract; and (3) CAUSE of the obligation which is established.',
  'These three elements are indispensable — absence of any one makes the contract void (Art. 1318). Consent must be freely given and not vitiated by mistake, violence, intimidation, undue influence, or fraud (Art. 1330). The object must be licit and determinate (Art. 1347). The cause must exist, be lawful, and be true (Art. 1352).',
  'enumeration', 'easy', 'bar_exam', 'Civil Law', 'Contracts',
  'Article 1318, Civil Code of the Philippines',
  'Art. 1318, Civil Code of the Philippines', true
),

(
  'What does Article 1306 of the Civil Code provide about the autonomy of contracts?',
  'Article 1306 states: "The contracting parties may establish such stipulations, clauses, terms and conditions as they may deem convenient, provided they are not contrary to law, morals, good customs, public order, or public policy." This is the principle of AUTONOMY OF CONTRACTS — parties are free to stipulate as they wish within the limits set by law.',
  'The freedom to contract is not absolute. The five limitations are: (1) law, (2) morals, (3) good customs, (4) public order, (5) public policy. Stipulations violating these are void (Art. 1409(1)).',
  'definition', 'medium', 'bar_exam', 'Civil Law', 'Contracts',
  'Article 1306, Civil Code of the Philippines',
  'Art. 1306, Civil Code of the Philippines', true
),

(
  'What does Article 1156 of the Civil Code define as an obligation?',
  'Article 1156: "An obligation is a juridical necessity to give, to do, or not to do." The term "juridical necessity" means the obligor is legally bound to perform; failure to do so entitles the obligee to legal remedies. Obligations are enforceable by law, distinguishing them from natural obligations and moral duties.',
  'The Civil Code concept of obligation is derived from Roman law. An obligation has three elements: (1) an active subject (creditor/obligee); (2) a passive subject (debtor/obligor); and (3) a prestation (the specific conduct owed: to give, to do, or not to do).',
  'definition', 'easy', 'bar_exam', 'Civil Law', 'Obligations',
  'Article 1156, Civil Code of the Philippines',
  'Art. 1156, Civil Code of the Philippines', true
),

(
  'Enumerate the sources of civil obligations under Article 1157 of the Civil Code.',
  'Article 1157 provides five sources of obligations: (1) LAW — obligations imposed directly by statute (e.g., obligation to pay taxes); (2) CONTRACTS — obligations arising from the stipulations of the parties; (3) QUASI-CONTRACTS — juridical relations arising from lawful, voluntary, and unilateral acts (e.g., negotiorum gestio, solutio indebiti); (4) ACTS OR OMISSIONS PUNISHED BY LAW (delicts/crimes); and (5) QUASI-DELICTS (torts) — acts or omissions causing damage to another through fault or negligence, with no pre-existing contractual relation.',
  'These five sources are exhaustive — no obligation exists outside them. Quasi-contracts (Art. 2142-2175) and quasi-delicts (Art. 2176-2194) fill gaps where there is no contract or crime.',
  'enumeration', 'medium', 'bar_exam', 'Civil Law', 'Obligations',
  'Article 1157, Civil Code of the Philippines',
  'Art. 1157, Civil Code of the Philippines', true
),

(
  'Classify and distinguish void, voidable, unenforceable, and rescissible contracts.',
  'VOID contracts produce no legal effect whatsoever; they cannot be ratified (Art. 1409). VOIDABLE contracts are valid until annulled; they can be ratified by the injured party (Art. 1390). UNENFORCEABLE contracts are valid but cannot be sued upon; they can be ratified (Art. 1403). RESCISSIBLE contracts are valid but may be rescinded in certain cases to prevent injury (Art. 1380). The key distinctions: Void = no effect, no ratification; Voidable = valid until annulled, ratifiable; Unenforceable = valid but cannot be enforced, ratifiable; Rescissible = valid, can be rescinded within 4 years.',
  'Memory aid: VURE (Void, Unenforceable, Rescissible, voidablE). Only VOID contracts are absolutely without effect from inception. All others produce some effect until challenged.',
  'distinction', 'hard', 'bar_exam', 'Civil Law', 'Contracts',
  'Articles 1380, 1390, 1403, 1409, Civil Code',
  'Arts. 1380, 1390, 1403, 1409, Civil Code of the Philippines', true
),

(
  'What are the Republic v. Molina guidelines for psychological incapacity under Article 36 of the Family Code?',
  'The Supreme Court in Republic v. Molina (G.R. No. 108763, 1997) laid down the following guidelines: (1) the burden of proof is on the petitioner; (2) the root cause of the incapacity must be medically or clinically identified, alleged in the complaint, sufficiently proven by experts, and explained in the decision; (3) the incapacity must exist at the time of celebration; (4) the incapacity must be grave (severe), juridically antecedent, and incurable; (5) such incapacity must be relevant to the assumption of marriage obligations; (6) expert testimony is required. Note: In Tan-Andal v. Andal (G.R. No. 196359, 2021), the SC relaxed the Molina guidelines, holding that psychological incapacity need not be a mental illness and that expert testimony, while helpful, is not required.',
  'Molina''s strict guidelines were relaxed by Tan-Andal (2021) which reconceptualized psychological incapacity as a legal (not medical) concept. The personality structure rendering a person incapable of understanding and discharging marital obligations suffices.',
  'case_doctrine', 'bar_level', 'bar_exam', 'Civil Law', 'Family Law',
  'Article 36, Family Code of the Philippines',
  'Art. 36, Family Code; Republic v. Molina, G.R. No. 108763 (1997); Tan-Andal v. Andal, G.R. No. 196359 (2021)', true
),

(
  'Who are the compulsory heirs under Article 887 of the Civil Code?',
  'Under Article 887, the following are compulsory heirs: (1) Legitimate children and descendants, with respect to their legitimate parents and ascendants; (2) In default of the foregoing, legitimate parents and ascendants; (3) The widow or widower; (4) Acknowledged natural children, and natural children by legal fiction; (5) Other illegitimate children. In the 1987 Family Code framework, all children regardless of legitimacy are compulsory heirs, though their shares differ.',
  'Compulsory heirs have a fixed portion called the legitime that cannot be diminished by the decedent through a will. The free portion of the estate may be freely disposed of. Preterition (total omission) of a compulsory heir in the direct line annuls the institution of heirs.',
  'enumeration', 'medium', 'bar_exam', 'Civil Law', 'Succession',
  'Article 887, Civil Code of the Philippines',
  'Art. 887, Civil Code of the Philippines', true
),

(
  'What is the legitime of legitimate children under the Civil Code?',
  'Under Article 888, the legitime of legitimate children and descendants consists of one-half (1/2) of the hereditary estate of the father and mother. When there is only one legitimate child, his legitime is one-half of the estate. When there are two or more, the 1/2 is divided equally among all of them.',
  'The legitime is a portion of the estate that the testator cannot dispose of freely. If the testator''s will impairs the legitime, the heirs can bring an action to reduce the testamentary dispositions (accion de reduccion). Donation inter vivos that impair the legitime are also subject to reduction.',
  'definition', 'medium', 'bar_exam', 'Civil Law', 'Succession',
  'Article 888, Civil Code of the Philippines',
  'Art. 888, Civil Code of the Philippines', true
),

(
  'How does Article 428 of the Civil Code define ownership and what rights does it include?',
  'Article 428: "The owner has the right to enjoy and dispose of a thing, without other limitations than those established by law. The owner has also a right of action against the holder and possessor of the thing in order to recover it." Ownership carries three core rights: (1) jus utendi — the right to use; (2) jus fruendi — the right to the fruits; (3) jus disponendi — the right to dispose; and (4) jus vindicandi — the right to recover from wrongful possessors.',
  'Ownership is the most complete real right over a thing. It is limited only by law (e.g., legal easements, zoning laws, eminent domain). The right of action to recover (accion reivindicatoria) is the vindicatory action of the owner.',
  'definition', 'medium', 'bar_exam', 'Civil Law', 'Property',
  'Article 428, Civil Code of the Philippines',
  'Art. 428, Civil Code of the Philippines', true
),

(
  'What is co-ownership under Article 484 of the Civil Code?',
  'Article 484: "There is co-ownership whenever the ownership of an undivided thing or right belongs to different persons." Each co-owner holds an IDEAL or ABSTRACT share of the whole property. Key rules: (1) Each co-owner may use the property provided it does not injure the interest of the co-ownership; (2) Co-owners share proportionally in benefits and charges; (3) No co-owner is compelled to remain in the co-ownership — action for partition may be brought at any time; (4) Acts of alteration require unanimous consent; acts of administration require majority vote.',
  'Co-ownership is different from partnership — it does not have juridical personality. A co-owner may alienate his ideal share without the consent of the others, but the other co-owners have the right of legal pre-emption (Art. 1620).',
  'definition', 'medium', 'bar_exam', 'Civil Law', 'Property',
  'Article 484, Civil Code of the Philippines',
  'Art. 484, Civil Code of the Philippines', true
),

(
  'Distinguish ordinary prescription from extraordinary prescription under the Civil Code.',
  'ORDINARY PRESCRIPTION (Art. 1134) — requires possession in good faith and with just title. Period: 10 years for immovable property, 4 years for movable property. EXTRAORDINARY PRESCRIPTION (Art. 1137) — does not require good faith or just title; possession alone suffices. Period: 30 years for immovable property, 8 years for movable property.',
  'Good faith means the possessor believes he has title and is not aware of any flaw. Just title means a title sufficient to transfer ownership if it had come from the true owner. Without good faith and just title, only extraordinary prescription applies.',
  'distinction', 'hard', 'bar_exam', 'Civil Law', 'Prescription',
  'Articles 1134, 1137, Civil Code of the Philippines',
  'Arts. 1134, 1137, Civil Code of the Philippines', true
),

(
  'Who are obliged to give support under Article 195 of the Family Code?',
  'Article 195 of the Family Code provides that the following are obliged to support each other to the whole extent: (1) the spouses; (2) legitimate ascendants and descendants; (3) parents and their legitimate children and the legitimate and illegitimate children of the latter; (4) parents and their illegitimate children; and (5) legitimate brothers and sisters, whether of full or half blood.',
  'Support includes everything indispensable for sustenance, dwelling, clothing, medical attendance, education, and transportation (Art. 194). The obligation is mutual. Support between spouses does not apply when judicially separated.',
  'enumeration', 'medium', 'bar_exam', 'Civil Law', 'Family Law',
  'Article 195, Family Code of the Philippines',
  'Art. 195, Family Code of the Philippines', true
),

(
  'What is the stipulation pour autrui under Article 1311 of the Civil Code?',
  'A stipulation pour autrui is a provision in a contract conferring a benefit upon a THIRD PERSON who is not a party to the contract. Under Article 1311(2), the third person must communicate his acceptance to the obligor before it is revoked. The stipulation is valid even though the third party is not a party to the contract — it is an exception to the principle of relativity of contracts.',
  'Requirements for valid stipulation pour autrui: (1) the stipulation must be part of a contract between two parties; (2) it must confer a benefit on the third person; (3) it must be a mere incidental benefit, not the primary purpose; (4) the third person must communicate acceptance before revocation. Failure to communicate acceptance = no acquired right.',
  'definition', 'hard', 'bar_exam', 'Civil Law', 'Contracts',
  'Article 1311, Civil Code of the Philippines',
  'Art. 1311, Civil Code of the Philippines', true
),

(
  'What is solutio indebiti and what are its requisites?',
  'Solutio indebiti (Art. 2154) is a quasi-contract that arises when something is received when there is no right to demand it, and it was unduly delivered through mistake. The person who received it is obliged to return it. Requisites: (1) a payment is made; (2) when there was no duty to pay; (3) the payment was made by mistake (not as a donation or liberality).',
  'Solutio indebiti is based on the principle that no one should unjustly enrich himself at the expense of another (Art. 22). The payor can recover only if payment was by mistake — not if it was intentional or gratuitous.',
  'definition', 'medium', 'bar_exam', 'Civil Law', 'Quasi-Contracts',
  'Article 2154, Civil Code of the Philippines',
  'Art. 2154, Civil Code of the Philippines', true
),

(
  'What is negotiorum gestio under the Civil Code?',
  'Negotiorum gestio (Art. 2144) is a quasi-contract arising when a person voluntarily manages the affairs or property of another WITHOUT any power of attorney or express authority from the owner. The gestor must continue the management until the owner takes over. The owner must pay the necessary and useful expenses incurred by the gestor; but the gestor has no right to compensation for his services unless agreed upon.',
  'The gestor acts without authority but in good faith for the benefit of the owner. Art. 2145 requires that the gestor must carry out the management with the diligence of a good father of a family. The owner is bound only for necessary and useful expenses, not for luxurious ones.',
  'definition', 'medium', 'bar_exam', 'Civil Law', 'Quasi-Contracts',
  'Article 2144, Civil Code of the Philippines',
  'Art. 2144, Civil Code of the Philippines', true
),

(
  'What does the abuse of rights doctrine under Articles 19-21 of the Civil Code provide?',
  'Article 19: Every person must, in the exercise of his rights and in the performance of his duties, act with justice, give everyone his due, and observe honesty and good faith. Article 20: Every person who, contrary to law, wilfully or negligently causes damage to another, shall indemnify the latter for the same. Article 21: Any person who wilfully causes loss or injury to another in a manner that is contrary to morals, good customs or public policy shall compensate the latter for the damage.',
  'The trilogy of Arts. 19-21 establishes the general principle that the exercise of a right must not be done abusively. Art. 19 is the general rule; Art. 20 covers acts against law; Art. 21 covers acts against morals/customs/public policy. Together, they create a comprehensive framework for human relations torts.',
  'definition', 'hard', 'bar_exam', 'Civil Law', 'Human Relations',
  'Articles 19-21, Civil Code of the Philippines',
  'Arts. 19-21, Civil Code of the Philippines', true
),

(
  'What is the principle of relativity of contracts under the Civil Code?',
  'Article 1311(1): "Contracts take effect only between the parties, their assigns and heirs, except in case where the rights and obligations arising from the contract are not transmissible by their nature, or by stipulation or by provision of law." This means a contract cannot impose obligations on third persons who are not parties — contracts are only binding between the contracting parties.',
  'Exceptions to relativity: (1) stipulation pour autrui (Art. 1311(2)); (2) contracts creating real rights which are binding on third persons with knowledge (Art. 1312); (3) contracts entered into to defraud creditors (accion pauliana — Art. 1313); (4) contracts creating obligations which run with the land.',
  'definition', 'medium', 'bar_exam', 'Civil Law', 'Contracts',
  'Article 1311, Civil Code of the Philippines',
  'Art. 1311, Civil Code of the Philippines', true
),

(
  'What are the essential elements of a donation under the Civil Code?',
  'Donation (Art. 725) is an act of liberality whereby a person (donor) disposes gratuitously of a thing or right in favor of another (donee) who accepts it. Essential elements: (1) REDUCTION of the donor''s patrimony; (2) INCREASE of the donee''s patrimony; (3) INTENT TO BENEFIT (animus donandi); (4) ACCEPTANCE by the donee. Form: Donation of immovable property must be in a public instrument; donation of movable property worth more than P5,000 must also be in writing.',
  'Donation inter vivos takes effect during the donor''s lifetime and cannot be revoked except for ingratitude, non-fulfillment of conditions, or birth of children. Donation mortis causa follows the formalities of a will.',
  'elements', 'medium', 'bar_exam', 'Civil Law', 'Donations',
  'Article 725, Civil Code of the Philippines',
  'Art. 725, Civil Code of the Philippines', true
),

(
  'What is the concept of paternity and filiation in Philippine family law?',
  'Filiation is the legal relationship between parent and child. Children may be: (1) LEGITIMATE — conceived or born during a valid marriage (Art. 164, Family Code); (2) ILLEGITIMATE — conceived and born outside a valid marriage; (3) LEGITIMATED — illegitimate children who may be legitimated by a subsequent valid marriage of their parents (Art. 177). Proof of legitimate filiation: record of birth in the civil register, final judgment, or admission in a public or private document signed by the parent (Art. 172).',
  'Under RA 9255, illegitimate children may now use the surname of the father if acknowledged. The Family Code removed the prior distinctions between natural children, natural children by legal fiction, and spurious/adulterous children — all are now simply "illegitimate."',
  'definition', 'medium', 'bar_exam', 'Civil Law', 'Family Law',
  'Articles 164-172, Family Code of the Philippines',
  'Arts. 164-172, Family Code of the Philippines; RA 9255', true
),

(
  'What is Article 1159 of the Civil Code and what principle does it embody?',
  'Article 1159: "Obligations arising from contracts have the force of law between the contracting parties and should be complied with in good faith." This embodies the principle of PACTA SUNT SERVANDA — agreements must be kept. A contract validly entered into is binding on the parties with the same force as a statute — they cannot unilaterally withdraw from it except as allowed by law or mutual agreement.',
  'Pacta sunt servanda is a fundamental principle of both civil law and public international law. In civil law, it means the contract is the law between the parties. Courts may not modify or relieve parties from contractual obligations unless there is a legal ground (e.g., Art. 1267 for impractical obligations, or force majeure).',
  'definition', 'easy', 'bar_exam', 'Civil Law', 'Contracts',
  'Article 1159, Civil Code of the Philippines',
  'Art. 1159, Civil Code of the Philippines', true
),

-- ============================================================
-- CRIMINAL LAW (20 questions)
-- ============================================================
(
  'How does Article 3 of the Revised Penal Code define a felony and distinguish dolo from culpa?',
  'Article 3 RPC: "Acts and omissions punishable by law are felonies (delitos). Felonies are committed not only by means of deceit (dolo) but also by means of fault (culpa). There is deceit when the act is performed with deliberate intent. There is fault when the wrongful act results from imprudence, negligence, lack of foresight, or lack of skill." DOLO = intentional felony; the act is done with deliberate intent. CULPA = culpable felony; the act results from negligence or imprudence — there is NO intent to cause the specific harm.',
  'This distinction is crucial for criminal liability. Intentional felonies (dolo) require intent; culpable felonies (culpa) require only fault. Many crimes in the RPC are intentional, but Art. 365 penalizes culpable felonies (reckless imprudence, simple imprudence).',
  'distinction', 'medium', 'bar_exam', 'Criminal Law', 'Felonies',
  'Article 3, Revised Penal Code',
  'Art. 3, Revised Penal Code (RPC)', true
),

(
  'What are the elements of self-defense as a justifying circumstance under Article 11 of the Revised Penal Code?',
  'Article 11(1) RPC requires three elements for a valid claim of self-defense: (1) UNLAWFUL AGGRESSION — the most indispensable element; there must be an actual physical assault or imminent threat of an attack; (2) REASONABLE NECESSITY of the means employed to prevent or repel it — the defense used must be proportionate to the attack; and (3) LACK OF SUFFICIENT PROVOCATION on the part of the person defending himself.',
  'Unlawful aggression is the sine qua non of self-defense. Without it, there is no self-defense. The first two elements are judged by the reasonable person standard. If all three elements concur, the act is justified — no criminal liability attaches.',
  'elements', 'medium', 'bar_exam', 'Criminal Law', 'Justifying Circumstances',
  'Article 11(1), Revised Penal Code',
  'Art. 11(1), Revised Penal Code (RPC)', true
),

(
  'What are the exempting circumstances under Article 12 of the Revised Penal Code?',
  'Article 12 RPC provides the following exempting circumstances (no criminal liability attaches): (1) An imbecile or insane person — unless they acted during a lucid interval; (2) A person under 15 years of age; (3) A person over 15 but under 18, unless acting with discernment; (4) A person who, while performing a lawful act with due care, causes injury by mere accident; (5) A person acting under the compulsion of an irresistible force; (6) A person acting under the impulse of an uncontrollable fear; (7) A person who fails to perform an act required by law when prevented by some lawful or insuperable cause.',
  'Exempting circumstances presuppose that a crime was committed but no criminal liability attaches because of the absence of intelligence, intent, or voluntariness. Civil liability may still exist in some exempting circumstances (e.g., Art. 12(4)).',
  'enumeration', 'medium', 'bar_exam', 'Criminal Law', 'Exempting Circumstances',
  'Article 12, Revised Penal Code',
  'Art. 12, Revised Penal Code (RPC)', true
),

(
  'What are the stages of execution of a felony under Article 6 of the Revised Penal Code?',
  'Article 6 RPC defines three stages: (1) ATTEMPTED — the offender commences the commission of the felony directly by overt acts, and does not perform all the acts of execution which should produce the felony as a consequence, by reason of some cause or accident other than his own spontaneous desistance; (2) FRUSTRATED — the offender performs all the acts of execution which would produce the felony as a consequence, but which, nevertheless, do not produce it by reason of causes independent of the will of the perpetrator; (3) CONSUMMATED — all the elements necessary for its execution and accomplishment are present.',
  'Key distinctions: Attempted = not all overt acts done, crime not produced. Frustrated = all acts done, crime not produced (independent causes). Consummated = all acts done, crime produced. Penalty scale: consummated > frustrated > attempted.',
  'definition', 'medium', 'bar_exam', 'Criminal Law', 'Stages of Execution',
  'Article 6, Revised Penal Code',
  'Art. 6, Revised Penal Code (RPC)', true
),

(
  'What is conspiracy under Article 8 of the Revised Penal Code?',
  'Article 8 RPC: "A conspiracy exists when two or more persons come to an agreement concerning the commission of a felony and decide to commit it." A proposal exists when the person who has decided to commit a felony proposes its execution to some other person or persons. Conspiracy to commit a felony is punishable only in the cases in which the law specially provides a penalty. When conspiracy is proven, the act of one conspirator is the act of all (Principle of Unity).',
  'Conspiracy does NOT require a prior formal agreement — it can be established by circumstantial evidence showing a common design and unity of purpose. The "act of one is the act of all" principle means all conspirators are equally liable as principals regardless of who actually committed the crime.',
  'definition', 'hard', 'bar_exam', 'Criminal Law', 'Conspiracy',
  'Article 8, Revised Penal Code',
  'Art. 8, Revised Penal Code (RPC)', true
),

(
  'Distinguish between compound crimes and complex crimes under Article 48 of the Revised Penal Code.',
  'Article 48 RPC: "When a single act constitutes two or more grave or less grave felonies, or when an offense is a necessary means for committing the other, the penalty for the most serious crime shall be imposed, the same to be applied in its maximum period." COMPOUND CRIME (delito compuesto) — a single act produces two or more grave or less grave felonies. COMPLEX CRIME PROPER (delito complejo) — one offense is a necessary means to commit the other. In both, only ONE penalty is imposed — for the most serious crime at its maximum period.',
  'Art. 48 applies only to felonies, not special law violations. The purpose is favorable to the accused — instead of separate penalties for each crime, only one (heavier) penalty is imposed. Light felonies are excluded from compound crimes.',
  'distinction', 'hard', 'bar_exam', 'Criminal Law', 'Complex Crimes',
  'Article 48, Revised Penal Code',
  'Art. 48, Revised Penal Code (RPC)', true
),

(
  'What does Article 22 of the Revised Penal Code provide about retroactivity of penal laws?',
  'Article 22 RPC: "Penal laws shall have a retroactive effect insofar as they favor the person guilty of a felony, who is not a habitual criminal, as this term is defined in Rule 5 of Article 62 of this Code, although at the time of the publication of such laws a final sentence has been pronounced and the convict is serving the same." RULE: A new penal law is retroactive if it is FAVORABLE to the accused. Exception: if the accused is a habitual delinquent under Art. 62.',
  'This is the principle of retroactivity of favorable penal laws. It applies even to those already convicted and serving sentence. It is also embodied in Art. III, Sec. 22 of the 1987 Constitution (no ex post facto law). Special laws may provide their own retroactivity rules.',
  'definition', 'medium', 'bar_exam', 'Criminal Law', 'Penal Laws',
  'Article 22, Revised Penal Code',
  'Art. 22, Revised Penal Code (RPC)', true
),

(
  'What is the territoriality principle under Article 2 of the Revised Penal Code?',
  'Article 2 RPC: The Revised Penal Code shall be enforced in the Philippine Archipelago, including its atmosphere, its interior waters and maritime zone. EXCEPTIONS (extraterritorial application): (1) offenses committed on Philippine ships or airships; (2) forging or counterfeiting Philippine currency or government documents; (3) introduction of such forged documents into the Philippines; (4) offenses committed by public officers or employees abroad in exercise of their functions; (5) crimes against national security committed abroad (Art. 114-123).',
  'The main rule is territorial — Philippine criminal law applies within Philippine territory. The five exceptions allow Philippine courts to exercise jurisdiction over crimes committed outside Philippine territory by Filipinos or affecting Philippine sovereignty.',
  'definition', 'medium', 'bar_exam', 'Criminal Law', 'Territoriality',
  'Article 2, Revised Penal Code',
  'Art. 2, Revised Penal Code (RPC)', true
),

(
  'Distinguish recidivism from habitual delinquency under the Revised Penal Code.',
  'RECIDIVISM (Art. 14, par. 9) — a generic aggravating circumstance that exists when the offender, at the time of his trial, has been previously convicted by final judgment of a crime embraced in the same title of the RPC as the new felony. No time limit. HABITUAL DELINQUENCY (Art. 62, par. 5) — a special aggravating circumstance that exists when a person within a 10-year period from last conviction or release is found guilty of the third time or oftener of robbery, theft, estafa, falsification, lesiones, or maltreatment. It carries an additional incremental penalty.',
  'Key distinctions: Recidivism requires same title, no time limit; Habitual Delinquency requires specific crimes (robbery, theft, estafa, etc.) and a 10-year period with 3rd or more conviction. Both affect the penalty but differently.',
  'distinction', 'hard', 'bar_exam', 'Criminal Law', 'Special Circumstances',
  'Articles 14(9) and 62, Revised Penal Code',
  'Arts. 14(9), 62, Revised Penal Code (RPC)', true
),

(
  'Distinguish mala in se from mala prohibita.',
  'MALA IN SE — acts that are wrong by their very nature; they are intrinsically immoral (e.g., murder, rape, theft). These are generally punished under the Revised Penal Code. Criminal intent (mens rea) is an essential element. MALA PROHIBITA — acts that are wrong because a law prohibits them; they are not inherently immoral. Generally penalized under special laws (e.g., violations of RA 9165 on drugs, BP 22 on bouncing checks). Criminal intent is NOT required — the mere commission of the prohibited act suffices.',
  'The distinction affects: (1) whether intent is required; (2) whether mitigating/aggravating circumstances apply (they generally apply only to mala in se); (3) whether the Indeterminate Sentence Law applies (it generally does not apply to special laws, with exceptions).',
  'distinction', 'medium', 'bar_exam', 'Criminal Law', 'Felonies',
  'Article 3, Revised Penal Code',
  'Art. 3, Revised Penal Code (RPC); General Principles of Criminal Law', true
),

(
  'What is the nullum crimen nulla poena sine lege principle and how is it applied in Philippine criminal law?',
  'Nullum crimen nulla poena sine lege means "no crime, no punishment without law." In Philippine law, this is embodied in Article 1 RPC (territorial and personal jurisdiction) and Art. III, Sec. 22 of the Constitution (no ex post facto law, no bill of attainder). No act or omission is punishable as a crime unless there is a law that clearly defines it and prescribes a penalty for it at the time of commission.',
  'This principle protects citizens from arbitrary prosecution. Acts committed before a law penalizing them was enacted cannot be prosecuted retroactively (except when the law is favorable to the accused — Art. 22 RPC). Courts must strictly construe penal laws and cannot extend them by analogy to acts not covered.',
  'definition', 'medium', 'bar_exam', 'Criminal Law', 'General Principles',
  'Article 1, Revised Penal Code; Article III, Section 22, 1987 Constitution',
  'Art. 1, RPC; Sec. 22, Art. III, 1987 Philippine Constitution', true
),

(
  'What is the proximate cause doctrine in criminal law?',
  'Under Article 4 RPC, criminal liability is incurred by any person committing a felony (delito) although the wrongful act done be different from that which he intended. The PROXIMATE CAUSE doctrine holds that the proximate cause of the victim''s death or injury (not just the immediate cause) determines criminal liability. If the felonious act is the proximate cause of the harm, the offender is criminally liable even if the immediate cause is a different event (e.g., inadequate medical treatment, victim''s own act).',
  'Example: A stabs B. B refuses surgery due to religious beliefs and dies. A is liable for the death because the stabbing is the proximate cause. Exceptions exist only for independent intervening causes that are so extraordinary and unforeseeable that they break the causal chain.',
  'definition', 'hard', 'bar_exam', 'Criminal Law', 'Criminal Liability',
  'Article 4, Revised Penal Code',
  'Art. 4, Revised Penal Code (RPC)', true
),

(
  'What is the doctrine of praeter intentionem under the Revised Penal Code?',
  'Praeter intentionem is a mitigating circumstance under Article 13(3) RPC — applicable "when the offender had no intention to commit so grave a wrong as that which he committed." It applies when the result is MORE serious than what the offender intended. Example: the accused intended only to slap the victim but the victim fell, hit his head, and died. The accused is liable for the graver consequence but praeter intentionem mitigates the penalty.',
  'Praeter intentionem differs from aberratio ictus (mistake in the blow — intended to hit A but hit B) and error in personae (mistake in identity — thought A was B). All three result in criminal liability under Art. 4 but differ in nature and mitigating effect.',
  'definition', 'hard', 'bar_exam', 'Criminal Law', 'Criminal Liability',
  'Articles 4 and 13(3), Revised Penal Code',
  'Arts. 4, 13(3), Revised Penal Code (RPC)', true
),

(
  'What is the Indeterminate Sentence Law and when does it apply?',
  'The Indeterminate Sentence Law (Act No. 4103) requires courts to impose an indeterminate sentence consisting of a MINIMUM and MAXIMUM term. For RPC crimes: the minimum is within the range of the penalty one degree lower; the maximum is the imposable penalty under the RPC considering mitigating and aggravating circumstances. For special law violations: the sentence shall not exceed the maximum nor be less than the minimum prescribed by the special law.',
  'The ISL does NOT apply when: (1) the penalty imposed is death or reclusion perpetua; (2) conviction is for treason, conspiracy or proposal to commit treason; (3) crimes against public order (rebellion, sedition); (4) piracy; (5) habitual delinquents; (6) those who escaped confinement; (7) those granted conditional pardon and violating its terms.',
  'definition', 'medium', 'bar_exam', 'Criminal Law', 'Penalties',
  'Act No. 4103, Indeterminate Sentence Law',
  'Act No. 4103 (Indeterminate Sentence Law)', true
),

(
  'Who are considered principals under Article 17 of the Revised Penal Code?',
  'Article 17 RPC: Principals are: (1) Those who take a DIRECT PART in the execution of the act; (2) Those who DIRECTLY FORCE OR INDUCE others to commit the felony (principal by inducement/induction); (3) Those who COOPERATE in the commission of the offense by another act without which it would not have been accomplished (principal by indispensable cooperation).',
  'The three types of principals receive the same penalty. Principal by inducement requires that the instigation was the determining cause of the crime (without it, the crime would not have been committed). Principal by indispensable cooperation renders a cooperation that cannot be substituted by any other means.',
  'enumeration', 'medium', 'bar_exam', 'Criminal Law', 'Participants in Crime',
  'Article 17, Revised Penal Code',
  'Art. 17, Revised Penal Code (RPC)', true
),

(
  'What is mitigating circumstance of passion or obfuscation under the Revised Penal Code?',
  'Article 13(6) RPC: A mitigating circumstance exists when the offender acted upon an impulse so powerful as naturally to have produced passion or obfuscation. Requisites: (1) the offender acted upon passion or obfuscation; (2) the passion or obfuscation was due to the unlawful act of the victim; (3) the act was not far removed from the commission of the crime by a considerable lapse of time; (4) the passion or obfuscation must arise from lawful sentiments (not from a spirit of lawlessness).',
  'This mitigating circumstance is incompatible with treachery (aggravating). It reduces the penalty by one period. Courts require proof that the passion actually existed and affected the offender''s act.',
  'definition', 'medium', 'bar_exam', 'Criminal Law', 'Mitigating Circumstances',
  'Article 13(6), Revised Penal Code',
  'Art. 13(6), Revised Penal Code (RPC)', true
),

(
  'What is the prescription of crimes under the Revised Penal Code?',
  'Under Article 90 RPC: Crimes punishable by death, reclusion perpetua, or reclusion temporal — 20 years. Other afflictive penalties — 15 years. Correctional penalties — 10 years, except arresto mayor — 5 years. Libel and other similar offenses — 1 year. Oral defamation and slander by deed — 6 months. Light offenses — 2 months. PRESCRIPTION BEGINS to run from the day the crime is discovered by the offended party, authorities, or their agents.',
  'Prescription of a crime is the loss of the State''s right to prosecute after the lapse of the prescriptive period. It is not a defense on the merits but a bar to prosecution. The period is interrupted by the filing of a complaint or information in court.',
  'period', 'hard', 'bar_exam', 'Criminal Law', 'Prescription',
  'Article 90, Revised Penal Code',
  'Art. 90, Revised Penal Code (RPC)', true
),

(
  'What are the aggravating circumstances of treachery and evident premeditation under the Revised Penal Code?',
  'TREACHERY (Art. 14, par. 16) — alevosia; the offender employs means, methods, or forms in the execution of the crime which tend directly and specially to ensure its execution WITHOUT RISK to himself arising from the defense which the offended party might make. EVIDENT PREMEDITATION (Art. 14, par. 13) — requires: (1) the time when the offender determined to commit the crime; (2) an act manifestly indicating that the offender clung to his determination; (3) sufficient lapse of time between the determination and execution to allow reflection.',
  'Both are qualifying aggravating circumstances for murder (Art. 248). Treachery requires that the mode of attack was deliberately adopted; it is personal and cannot be imputed to co-conspirators who were unaware of it. Evident premeditation requires cold, calculated plotting.',
  'definition', 'hard', 'bar_exam', 'Criminal Law', 'Aggravating Circumstances',
  'Article 14(13)(16), Revised Penal Code',
  'Arts. 14(13), 14(16), Revised Penal Code (RPC)', true
),

(
  'What does Article 10 of the Revised Penal Code provide about the relationship between the RPC and special laws?',
  'Article 10 RPC: "Offenses which are or in the future may be punishable under special laws are not subject to the provisions of this Code. This Code shall be supplementary to such laws, unless the latter should specially provide the contrary." The RPC has SUPPLEMENTARY application to special laws — meaning provisions of the RPC apply to special law violations when the special law is silent, such as rules on mitigating circumstances, exempting circumstances, and the Indeterminate Sentence Law.',
  'Supplementary application means the RPC fills the gaps in special laws. Example: Art. 12 (exempting circumstances) applies to special law offenses when those laws do not expressly exclude it. However, the primary rules of a special law prevail over the RPC.',
  'definition', 'medium', 'bar_exam', 'Criminal Law', 'Special Laws',
  'Article 10, Revised Penal Code',
  'Art. 10, Revised Penal Code (RPC)', true
),

(
  'What are principal penalties under the Revised Penal Code and how are they classified?',
  'Under Articles 25 and 27 RPC, principal penalties are classified as: CAPITAL PUNISHMENT: Death (suspended since RA 9346, 2006). AFFLICTIVE PENALTIES: Reclusion perpetua (20 years + 1 day to 40 years); Reclusion temporal (12 years + 1 day to 20 years); Perpetual or temporary absolute disqualification; Perpetual or temporary special disqualification; Prision mayor (6 years + 1 day to 12 years). CORRECTIONAL PENALTIES: Prision correccional (6 months + 1 day to 6 years); Arresto mayor (1 month + 1 day to 6 months); Suspension; Destierro. LIGHT PENALTIES: Arresto menor (1 day to 30 days); Public censure.',
  'The classification matters for prescription, probation eligibility, ISL application, and other procedural rules. RA 9346 prohibited the imposition of the death penalty; the penalty is commuted to reclusion perpetua.',
  'enumeration', 'hard', 'bar_exam', 'Criminal Law', 'Penalties',
  'Articles 25-27, Revised Penal Code',
  'Arts. 25-27, Revised Penal Code (RPC); RA 9346', true
),

-- ============================================================
-- REMEDIAL LAW (10 questions)
-- ============================================================
(
  'Define jurisdiction and state how it is conferred in Philippine courts.',
  'Jurisdiction is the power and authority of a court to hear, try, and decide a case. It is conferred by the CONSTITUTION or by LAW — not by the consent of the parties, not by estoppel, and not by the court itself. Jurisdiction cannot be acquired by agreement of the parties. Once a court has jurisdiction, it retains it through the entire proceedings. The determination of jurisdiction is based on the allegations in the complaint (or information) and the relief sought.',
  'Jurisdiction over the subject matter is determined by the nature of the offense and the penalty imposable (criminal cases) or by the amount involved (civil cases). Failure to acquire jurisdiction is fatal — all proceedings are void.',
  'definition', 'medium', 'bar_exam', 'Remedial Law', 'Jurisdiction',
  'Rule 1, Rules of Court; Batas Pambansa Blg. 129',
  'Rule 1, Rules of Court; BP 129 as amended by RA 7691', true
),

(
  'What is the exclusive original jurisdiction of the Metropolitan/Municipal Trial Court vs the Regional Trial Court?',
  'MTC/MeTC/MCTC exclusive original jurisdiction (RA 7691): (1) Civil cases — exclusive jurisdiction where the amount of the demand does not exceed P2,000,000 (exclusive of interest, damages, attorney''s fees, etc.); (2) Criminal cases — all violations of city or municipal ordinances; offenses punishable by imprisonment not exceeding 6 years; (3) Small claims — up to P1,000,000 (A.M. No. 08-8-7-SC). RTC exclusive original jurisdiction: (1) Civil cases — demand exceeds P2,000,000; (2) Criminal cases — offenses punishable by reclusion perpetua or higher, or where the penalty exceeds 6 years; (3) Family courts, commercial courts; (4) Cases beyond MTC jurisdiction.',
  'RA 7691 expanded MTC jurisdiction. The jurisdictional amount for civil cases should be checked against the current Supreme Court circular. For criminal cases, it is the imposable penalty, not the actual penalty imposed, that determines jurisdiction.',
  'jurisdiction', 'medium', 'bar_exam', 'Remedial Law', 'Jurisdiction',
  'Batas Pambansa Blg. 129; RA 7691',
  'BP 129 as amended by RA 7691; A.M. No. 08-8-7-SC', true
),

(
  'What are the requirements of a valid complaint or information under the Rules of Court?',
  'Under Rule 110, Sec. 6, a complaint or information is sufficient if it: (1) states the NAME of the accused; (2) designates the OFFENSE given by statute; (3) states the ACTS OR OMISSIONS constituting the offense; (4) specifies the QUALIFYING AND AGGRAVATING CIRCUMSTANCES; (5) states the APPROXIMATE DATE of the commission; (6) names the OFFENDED PARTY. The information must be in writing, subscribed by the prosecutor, and filed in court.',
  'Sufficient information enables the accused to prepare his defense and to avail of double jeopardy in case of acquittal or conviction. Defects in the information that do not affect the substantial rights of the accused may be cured by amendment.',
  'requisites', 'medium', 'bar_exam', 'Remedial Law', 'Criminal Procedure',
  'Rule 110, Section 6, Rules of Court',
  'Rule 110, Sec. 6, Rules of Court (2000)', true
),

(
  'Distinguish personal service from substituted service of summons.',
  'PERSONAL SERVICE (Rule 14, Sec. 6) — summons is handed directly to the defendant. This is the preferred mode and must be attempted first. SUBSTITUTED SERVICE (Rule 14, Sec. 7) — available only when personal service cannot be made within a reasonable time. Requirements: (1) leave a copy at defendant''s RESIDENCE with a person of suitable age and discretion residing therein; OR (2) leave a copy at defendant''s OFFICE or regular place of business with a competent person in charge. The sheriff''s return must state the reasons why personal service was not possible.',
  'Substituted service is strictly construed — the sheriff must make several attempts at personal service before resorting to substituted service. Failure to comply with the requirements renders the service void, depriving the court of jurisdiction over the person of the defendant.',
  'distinction', 'medium', 'bar_exam', 'Remedial Law', 'Civil Procedure',
  'Rule 14, Sections 6-7, Rules of Court',
  'Rule 14, Secs. 6-7, Rules of Court (2019 Amendments)', true
),

(
  'When may a defendant be declared in default and what are the effects?',
  'A defendant is declared in default when: (1) he fails to answer the complaint within the required period; AND (2) the plaintiff files a motion to declare the defendant in default with proof of failure to answer. Effects of default: (1) the defendant loses standing in court and cannot participate in the trial; (2) the court proceeds to render judgment based on the plaintiff''s evidence alone; (3) the defendant is NOT entitled to notice of subsequent proceedings. The default order does NOT mean automatic judgment for the plaintiff — plaintiff must still prove the claim. The defendant may file a motion to lift default.',
  'Default is a procedural consequence of non-appearance, not a penalty. It is lifted by showing: (1) the failure to answer was due to fraud, accident, mistake, or excusable negligence; (2) there is a meritorious defense. An order of default is interlocutory and not immediately appealable.',
  'definition', 'medium', 'bar_exam', 'Remedial Law', 'Civil Procedure',
  'Rule 9, Section 3, Rules of Court',
  'Rule 9, Sec. 3, Rules of Court', true
),

(
  'What is a demurrer to evidence and what are the effects of its grant or denial?',
  'A demurrer to evidence (Rule 33) is filed by the defendant after the plaintiff rests his case, on the ground that the plaintiff''s evidence is insufficient to sustain his cause of action. EFFECT OF GRANT: the case is dismissed for insufficiency of evidence; the plaintiff may appeal. EFFECT OF DENIAL: the defendant may adduce evidence. If the demurrer was filed WITH prior leave of court and is denied, defendant may still present evidence. If filed WITHOUT leave and is denied, defendant is deemed to have waived his right to present evidence; only judgment on the basis of plaintiff''s evidence.',
  'The "with or without leave" distinction is critical. Without leave of court, a denial of the demurrer means the defendant has waived his right to present evidence — a gamble on the strength of the demurrer. This rule also applies in criminal cases under Rule 119.',
  'definition', 'hard', 'bar_exam', 'Remedial Law', 'Civil Procedure',
  'Rule 33, Rules of Court',
  'Rule 33, Rules of Court', true
),

(
  'Distinguish certiorari under Rule 65 from an ordinary appeal under Rule 41.',
  'CERTIORARI (Rule 65) — a special civil action, not a mode of appeal. Grounds: grave abuse of discretion amounting to lack or excess of jurisdiction. Filed within 60 days from notice of judgment or denial of motion for reconsideration. It goes to a higher court (CA, SC) to annul the challenged act. An appeal via Rule 41 suspends the period to file certiorari. APPEAL (Rule 41) — a mode of review, not a special civil action. Grounds: errors of law or fact in the judgment. Filed within 15 days from notice of judgment. Goes to the appellate court which reviews the case on its merits. DISTINGUISHING RULE: Certiorari is for jurisdictional errors; appeal is for errors of judgment.',
  'Filing both simultaneously is generally not allowed (forum shopping). A wrong remedy (appeal when certiorari is proper, or vice versa) does not vest jurisdiction — the case may be dismissed. The availability of appeal generally bars certiorari.',
  'distinction', 'hard', 'bar_exam', 'Remedial Law', 'Special Civil Actions',
  'Rules 41 and 65, Rules of Court',
  'Rules 41, 65, Rules of Court', true
),

(
  'When does a judgment become final and executory and when may it be executed?',
  'A judgment becomes FINAL AND EXECUTORY (immutable) upon the expiration of the period to appeal (15 days for ordinary cases, 30 days for special cases) without an appeal being filed, or upon affirmance of the judgment on appeal and entry in the Book of Entries of Judgments. Execution is a matter of right when the judgment is final. Execution may be: (1) EXECUTION AS A MATTER OF RIGHT — filed within 5 years from entry of judgment; (2) EXECUTION BY MOTION — filed within 5 years; (3) REVIVAL OF JUDGMENT — by action, filed within 10 years from finality (Art. 1144(3), Civil Code).',
  'The period from finality to execution: 5 years by motion; after 5 years but within 10 years by action (revival suit). After 10 years, the judgment is barred by prescription and can no longer be executed.',
  'period', 'medium', 'bar_exam', 'Remedial Law', 'Execution',
  'Rule 39, Rules of Court',
  'Rule 39, Rules of Court; Art. 1144(3), Civil Code', true
),

(
  'What is the Small Claims Court procedure under the Rules of Court?',
  'The Small Claims Court (A.M. No. 08-8-7-SC, as amended) handles cases exclusively for PAYMENT OF MONEY where the claim does not exceed P1,000,000. No lawyers are allowed to represent parties (except in certain cases). Procedure: (1) File Statement of Claim with supporting documents; (2) Court issues summons; (3) Hearing within 30 days from filing — informal, no formal rules of evidence; (4) Decision rendered on the same day of hearing; (5) No appeal (final and unappealable) except via Rule 65 certiorari; (6) The judge conducts hearings and may direct parties to settle.',
  'The small claims procedure is designed for speed and accessibility — no technicalities, no lawyers (usually), one-day resolution. It covers money claims arising from contracts, demand for money, or damages — not injunctions, real actions, or status-related claims.',
  'procedure', 'medium', 'bar_exam', 'Remedial Law', 'Small Claims',
  'A.M. No. 08-8-7-SC (Small Claims Rules)',
  'A.M. No. 08-8-7-SC, Rules of Procedure for Small Claims Cases', true
),

(
  'What is the Katarungang Pambarangay Law and when is it required before filing in court?',
  'The Katarungang Pambarangay Law (RA 7160, Sec. 399-422; Revised Katarungang Pambarangay Law) requires that disputes between parties who actually reside in the same BARANGAY, or in different barangays in the same city or municipality, must first be submitted to barangay conciliation (Lupong Tagapamayapa) before filing in court. Exceptions: (1) disputes involving real property in different cities/municipalities; (2) one party is the government or public officer; (3) urgent legal action (injunction, etc.); (4) criminal offenses with penalties exceeding 1 year or fine over P5,000; (5) offenses where no private offended party; (6) where parties are from different provinces.',
  'Non-compliance with the barangay conciliation requirement (failure to secure Certification to File Action) is a ground for dismissal of the complaint. The barangay serves as an accessible, informal first-line dispute resolution mechanism.',
  'procedure', 'medium', 'bar_exam', 'Remedial Law', 'Katarungang Pambarangay',
  'Republic Act No. 7160, Sections 399-422',
  'RA 7160 (Local Government Code), Secs. 399-422', true
),

-- ============================================================
-- LEGAL ETHICS (10 questions)
-- ============================================================
(
  'What is the attorney-client privilege and what are its scope and exceptions?',
  'The attorney-client privilege (Rule 130, Sec. 24(b), Rules of Court; Rule 21.01, CPR) protects confidential communications made by a client to his attorney in the course of professional employment. Scope: covers ALL communications made in confidence for the purpose of seeking legal advice. Exceptions: (1) crime-fraud exception — future crimes or frauds intended by the client are not protected; (2) attorney-client relationship not established; (3) communication not made in confidence; (4) communication made to enable the client to commit a future crime. The privilege belongs to the CLIENT, not the lawyer; only the client can waive it.',
  'The privilege is absolute within its scope. It survives the death of the client. It covers communications with the lawyer''s staff acting on the lawyer''s behalf. The policy is to encourage full and frank disclosure between client and lawyer.',
  'definition', 'medium', 'bar_exam', 'Legal Ethics', 'Attorney-Client Privilege',
  'Rule 130, Section 24(b), Rules of Court; Canon 21, Code of Professional Responsibility',
  'Rule 130, Sec. 24(b), Rules of Court; Canon 21, CPR', true
),

(
  'What constitutes conflict of interest under Canon 15 of the Code of Professional Responsibility?',
  'Canon 15, Rule 15.03 CPR: A lawyer shall not represent conflicting interests except by written consent of all concerned given after a full disclosure of the facts. A conflict of interest exists when: (1) the acceptance of a new client''s case would require a lawyer to use information against a former client; (2) a lawyer represents parties with adverse interests in the same matter; (3) the lawyer''s loyalty is divided between the new client and a former client. The test is whether the acceptance of a new relation would prevent the full discharge of the lawyer''s duty of undivided fidelity and loyalty to the former client.',
  'Even with written consent, if the conflict is irreconcilable, the lawyer must decline. A former client''s information is always protected — a lawyer cannot use it against the former client even after the relationship ends. Breach is a ground for disbarment or suspension.',
  'definition', 'hard', 'bar_exam', 'Legal Ethics', 'Conflict of Interest',
  'Canon 15, Rule 15.03, Code of Professional Responsibility',
  'Canon 15, Rule 15.03, Code of Professional Responsibility (CPR)', true
),

(
  'What are the grounds for disbarment of a lawyer under Philippine law?',
  'Under Section 27, Rule 138, Rules of Court, a member of the bar may be removed or suspended for: (1) deceit; (2) malpractice; (3) grossly immoral conduct; (4) conviction of a crime involving moral turpitude; (5) violation of the lawyer''s oath; (6) willful disobedience of a lawful order of the Supreme Court; (7) corruptly and willfully appearing as an attorney for a party to a case without authority to do so.',
  'Disbarment is not a punishment but a means to protect the court and the public. The proceeding is sui generis — neither criminal nor civil but disciplinary in nature. The Supreme Court has exclusive jurisdiction over disciplinary proceedings against lawyers.',
  'enumeration', 'medium', 'bar_exam', 'Legal Ethics', 'Disbarment',
  'Rule 138, Section 27, Rules of Court',
  'Sec. 27, Rule 138, Rules of Court', true
),

(
  'What is the duty of candor to the court under Canon 10 of the Code of Professional Responsibility?',
  'Canon 10 CPR: A lawyer owes candor, fairness, and good faith to the court. Rule 10.01: A lawyer shall not do any falsehood, nor consent to the doing of any in court; nor shall he mislead, or allow the court to be misled by any artifice. Rule 10.02: A lawyer shall not knowingly misquote or misrepresent the contents of a paper, the language or the argument of an opposing counsel, or the text of a decision or authority. Rule 10.03: A lawyer shall observe the rules of procedure and shall not misuse them to defeat the ends of justice.',
  'The duty of candor is paramount — a lawyer''s primary obligation is to the court, not just to the client. A lawyer who makes false statements to the court, files frivolous motions, or misrepresents the law violates this canon and may be cited for contempt and disciplined.',
  'definition', 'medium', 'bar_exam', 'Legal Ethics', 'Duty to Court',
  'Canon 10, Code of Professional Responsibility',
  'Canon 10, Rules 10.01-10.03, Code of Professional Responsibility (CPR)', true
),

(
  'Is membership in the Integrated Bar of the Philippines mandatory for all lawyers?',
  'YES. Under Section 1, Rule 139-A, Rules of Court, all persons admitted to the Philippine bar shall be integrated into the Integrated Bar of the Philippines (IBP). Membership is MANDATORY and not optional. Every member must pay annual dues. Failure to pay dues or to comply with IBP requirements is a ground for suspension from the practice of law. The IBP is the official national organization of lawyers in the Philippines created by the Supreme Court.',
  'The IBP was established by PD 181 (1973) and Rule 139-A of the Rules of Court. It serves as the vehicle for: (1) elevating the standards of the legal profession; (2) improving the administration of justice; (3) enabling the bar to discharge its public responsibility. The Supreme Court has supervisory authority over the IBP.',
  'definition', 'easy', 'bar_exam', 'Legal Ethics', 'IBP',
  'Rule 139-A, Rules of Court; PD 181',
  'Rule 139-A, Rules of Court; Presidential Decree No. 181', true
),

(
  'What is a champertous contract and why is it void under Philippine law?',
  'A champertous contract is an agreement between a lawyer and a client whereby the lawyer agrees to pay or bear the expenses of litigation in exchange for a contingent fee or a share of the proceeds of the litigation. It is void and unenforceable because it violates Canon 42 of the CPR (old), now equivalent to the rule against champerty. The prohibition is grounded in public policy — it encourages speculative litigation, may tempt the lawyer to conduct the suit for his own benefit rather than the client''s, and may corrupt the administration of justice.',
  'Champertous contracts must be distinguished from contingency fee arrangements (which are allowed, subject to reasonableness). In contingency fees, the lawyer''s fee depends on success but the lawyer does NOT advance or bear the expenses of litigation — the client does.',
  'definition', 'medium', 'bar_exam', 'Legal Ethics', 'Fees',
  'Code of Professional Responsibility; Bautista v. Gonzales, A.M. No. 1625',
  'CPR; Bautista v. Gonzales, A.M. No. 1625-Ret. (1990)', true
),

(
  'What are the requirements for valid notarial practice under the Notarial Rules?',
  'Under A.M. No. 02-8-13-SC (2004 Notarial Rules), a notary public must: (1) be a Filipino citizen; (2) be a duly licensed member of the Philippine bar; (3) have at the minimum 2 years of law practice; (4) not have been convicted of a crime involving moral turpitude; (5) not have been removed or suspended from the practice of law; (6) have a regular place of work and business in the city/province where commissioned. The notary public must: (a) require the personal appearance of the signatory; (b) identify the signatory through competent evidence of identity; (c) sign and affix the official seal.',
  'The 2004 Notarial Rules tightened requirements for notarization. A notary who notarizes a document without the personal appearance of the signatory, or who notarizes without being commissioned, faces administrative sanction including revocation of commission and suspension from practice.',
  'requisites', 'medium', 'bar_exam', 'Legal Ethics', 'Notarial Practice',
  'A.M. No. 02-8-13-SC (2004 Rules on Notarial Practice)',
  'A.M. No. 02-8-13-SC, 2004 Rules on Notarial Practice', true
),

(
  'What are the duties of a lawyer to the public under Canons 1 and 2 of the Code of Professional Responsibility?',
  'Canon 1: A lawyer shall uphold the Constitution, obey the laws of the land and promote respect for law and legal processes. Rule 1.01: A lawyer shall not engage in unlawful, dishonest, immoral, or deceitful conduct. Rule 1.02: A lawyer shall not counsel or abet activities aimed at defiance of the law. Canon 2: A lawyer shall make his legal services available in an efficient and convenient manner compatible with the independence, integrity, and effectiveness of the profession. Rule 2.01: A lawyer shall not reject, except for valid reasons, the cause of the defenseless or the oppressed. Rule 2.02: In such cases, the lawyer shall offer legal services at a reduced fee or for free.',
  'Canons 1 and 2 establish the lawyer''s primary duty to the public and the legal system — above the duty to the client. A lawyer is an officer of the court first and an advocate for the client second. This priority is the foundation of the entire Code.',
  'enumeration', 'medium', 'bar_exam', 'Legal Ethics', 'Duty to Public',
  'Canons 1-2, Code of Professional Responsibility',
  'Canons 1-2, Rules 1.01-2.02, Code of Professional Responsibility (CPR)', true
),

(
  'Distinguish between a charging lien and a retaining lien of an attorney.',
  'RETAINING LIEN — a passive lien; the attorney retains the documents, funds, and papers of the client until his fees are paid. It does NOT require court proceedings to enforce; the attorney simply holds the papers. Limited to papers that came into the attorney''s possession in his professional capacity. CHARGING LIEN — an active lien on the judgment, execution, or other recovery obtained by the attorney''s efforts; it is a lien on the fruits of the attorney''s labor. It requires (1) the attorney caused the entry of judgment; (2) there is a rightful recovery; (3) a written notice to the client and adverse party. It is enforced by motion in court.',
  'Key difference: Retaining lien = hold papers passively; Charging lien = attach to the judgment actively. A retaining lien is lost if the attorney voluntarily surrenders the papers. A charging lien attaches to the judgment regardless of paper custody.',
  'distinction', 'hard', 'bar_exam', 'Legal Ethics', 'Attorney''s Fees',
  'Rule 138, Section 37, Rules of Court',
  'Sec. 37, Rule 138, Rules of Court', true
),

(
  'What is the rule on confidentiality under Rule 21.01 of the Code of Professional Responsibility?',
  'Rule 21.01 CPR: A lawyer shall not reveal the confidences or secrets of his client except: (1) when authorized by the client after acquainting him of the consequences of the disclosure; (2) when required by law — such as prevention of a crime or fraud; (3) when necessary to collect his fees or defend himself against a formal charge of wrongdoing by his client. The duty of confidentiality is broader than the attorney-client privilege — it covers ALL information relating to the representation, not just privileged communications.',
  'The duty of confidentiality continues even after the termination of the attorney-client relationship — it is perpetual. It protects the client''s right to consult the lawyer freely. Breach is a ground for disciplinary action under Rule 139-B (bar discipline).',
  'definition', 'medium', 'bar_exam', 'Legal Ethics', 'Confidentiality',
  'Rule 21.01, Code of Professional Responsibility',
  'Rule 21.01, Code of Professional Responsibility (CPR)', true
)

ON CONFLICT DO NOTHING;
