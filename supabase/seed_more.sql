-- ============================================================
-- PH LAW BAR REVIEW — EXPANDED SEED (200+ Questions)
-- Run AFTER schema.sql and seed.sql
-- ============================================================

INSERT INTO public.questions
  (content, answer, explanation, question_type, difficulty, level, subject, topic, source_article, source_citation, is_verified)
VALUES

-- ============================================================
-- COMMERCIAL LAW — Corporation Law (25 questions)
-- ============================================================
(
  'What is the doctrine of piercing the corporate veil?',
  'Piercing the corporate veil is the legal process of disregarding the separate corporate personality of a corporation and holding its stockholders, directors, or officers personally liable for corporate acts. It applies when the corporate fiction is used (1) to defeat public convenience, (2) to justify wrong or fraud, (3) to defend crime, or (4) when the corporation is merely an alter ego of a person.',
  'The doctrine is an exception to the rule of separate legal personality. Courts will pierce the veil when strict adherence to the fiction of a corporate entity would lead to injustice. The burden is on the party seeking piercing to prove fraud or bad faith.',
  'definition', 'hard', 'bar_exam', 'Commercial Law', 'Corporation Law',
  'Section 2, Corporation Code; Alter Ego Doctrine',
  'Sec. 2, Revised Corporation Code (RA 11232)', true
),
(
  'What is the trust fund doctrine in corporation law?',
  'The trust fund doctrine provides that the capital stock, property, and assets of a corporation are held in trust for its creditors. The stockholders may not withdraw the capital invested in such a manner that it will prejudice the rights of creditors. The paid-in capital serves as a security fund for those who extend credit to the corporation.',
  'This doctrine prevents stockholders from dissipating corporate assets to the prejudice of creditors. It is the basis for requiring shareholder approval for capital reduction and prohibiting declaration of dividends that would impair capital.',
  'definition', 'hard', 'bar_exam', 'Commercial Law', 'Corporation Law',
  'Trust Fund Doctrine; Phil. Trust Co. v. Rivera',
  'Trust Fund Doctrine; Revised Corporation Code (RA 11232)', true
),
(
  'Distinguish a stock corporation from a non-stock corporation.',
  'A STOCK CORPORATION has capital stock divided into shares and is authorized to distribute dividends to its shareholders. A NON-STOCK CORPORATION has no capital stock divided into shares and its income or profit is not distributable to members, trustees, or officers. Non-stock corporations are formed for charitable, religious, educational, civic, or similar purposes.',
  'Stock corporations aim to generate profit for shareholders. Non-stock corporations exist for purposes other than profit — examples include foundations, religious organizations, and homeowners associations.',
  'distinction', 'medium', 'bar_exam', 'Commercial Law', 'Corporation Law',
  'Sections 3 and 86, Revised Corporation Code',
  'Secs. 3 & 86, Revised Corporation Code (RA 11232)', true
),
(
  'What are the qualifications of a director of a corporation under the Revised Corporation Code?',
  'A director must: (1) own at least one share of capital stock of record; (2) be of legal age; (3) possess full legal capacity; (4) not be convicted by final judgment of an offense punishable by imprisonment of more than 6 years; (5) not be convicted of a violation involving moral turpitude; and (6) meet other qualifications in the by-laws or as required by law.',
  'The Revised Corporation Code (RA 11232) removed the citizenship requirement for directors except in nationalized industries. The one-share requirement ensures directors have a stake in the corporation.',
  'enumeration', 'medium', 'bar_exam', 'Commercial Law', 'Corporation Law',
  'Section 22, Revised Corporation Code',
  'Sec. 22, Revised Corporation Code (RA 11232)', true
),
(
  'What is the business judgment rule?',
  'The business judgment rule is a presumption that in making a business decision, the directors of a corporation acted on an informed basis, in good faith, and in the honest belief that the action taken was in the best interests of the corporation. Courts will not interfere with the business judgment of directors so long as they acted within the scope of their authority and in good faith.',
  'The rule protects directors from personal liability for decisions that may later prove unwise or unprofitable. It does not protect directors who acted fraudulently, in bad faith, or beyond their authority.',
  'definition', 'hard', 'bar_exam', 'Commercial Law', 'Corporation Law',
  'Business Judgment Rule; Fiduciary Duty of Directors',
  'Business Judgment Rule; Revised Corporation Code (RA 11232)', true
),
(
  'What is the pre-emptive right of stockholders?',
  'Pre-emptive right is the right of existing stockholders to subscribe to all issues or dispositions of shares of any class of the corporation in proportion to their respective shareholdings before the shares may be offered to the public. It is a protection against dilution of a stockholder''s percentage ownership.',
  'Pre-emptive rights may be denied or restricted in the articles of incorporation. Under the Revised Corporation Code, it does not apply to shares issued: (1) pursuant to conversion of convertible notes; (2) in exchange for property; (3) as payment of previously contracted debts.',
  'definition', 'medium', 'bar_exam', 'Commercial Law', 'Corporation Law',
  'Section 38, Revised Corporation Code',
  'Sec. 38, Revised Corporation Code (RA 11232)', true
),
(
  'What is the appraisal right and when does it arise?',
  'The appraisal right is the right of a dissenting stockholder to demand payment of the fair value of his shares when the corporation takes certain actions he disagrees with. It arises when: (1) amendments to the articles of incorporation materially affect stockholder rights; (2) sale of all or substantially all corporate assets; (3) investment in another business; (4) merger or consolidation; (5) extension or shortening of corporate term.',
  'The stockholder must vote against the proposed corporate action and must make a written demand within 30 days from the meeting date. If no agreement on value, an appraisal committee determines fair value.',
  'definition', 'hard', 'bar_exam', 'Commercial Law', 'Corporation Law',
  'Section 80, Revised Corporation Code',
  'Sec. 80, Revised Corporation Code (RA 11232)', true
),

-- ============================================================
-- COMMERCIAL LAW — Negotiable Instruments Law (20 questions)
-- ============================================================
(
  'What are the requisites for an instrument to be negotiable under the Negotiable Instruments Law?',
  'Under Section 1 of Act 2031, a negotiable instrument must: (1) be in writing and signed by the maker or drawer; (2) contain an unconditional promise or order to pay a sum certain in money; (3) be payable on demand or at a fixed or determinable future time; (4) be payable to order or to bearer; and (5) where it is addressed to a drawee, the drawee must be named or indicated with reasonable certainty.',
  'All five requisites must concur. Failure to meet any one renders the instrument non-negotiable, though it may still be valid as an ordinary contract. The "sum certain in money" excludes payment partly in goods.',
  'enumeration', 'medium', 'bar_exam', 'Commercial Law', 'Negotiable Instruments',
  'Section 1, Act 2031 (Negotiable Instruments Law)',
  'Sec. 1, Act 2031 (Negotiable Instruments Law)', true
),
(
  'Distinguish a holder in due course from an ordinary holder.',
  'A HOLDER IN DUE COURSE (HDC) takes the instrument: (1) for value; (2) before it is overdue and without notice of dishonor; (3) in good faith; and (4) without notice of any defect or defense. An HDC holds the instrument free from personal defenses available against prior parties. An ORDINARY HOLDER merely acquires the instrument by transfer without meeting HDC requirements and is subject to all defenses available to prior parties.',
  'Real defenses (forgery, fraud in factum, minority, illegality of instrument) are available even against an HDC. Personal defenses (failure of consideration, fraud inducing execution) are only available against non-HDC holders.',
  'distinction', 'hard', 'bar_exam', 'Commercial Law', 'Negotiable Instruments',
  'Sections 52-57, Act 2031',
  'Secs. 52-57, Act 2031 (Negotiable Instruments Law)', true
),
(
  'What is the shelter principle in negotiable instruments law?',
  'The shelter principle provides that a transferee of a negotiable instrument acquires the same rights as the transferor. If the transferor is a holder in due course, the transferee — even if not personally a holder in due course — acquires the rights of a holder in due course. This applies even when the transferee had notice of the defect, as long as the transferee was not a party to fraud.',
  'The principle prevents instruments from being "frozen" and promotes their free circulation. It does not apply if the transferee was himself a party to fraud or illegality affecting the instrument.',
  'definition', 'hard', 'bar_exam', 'Commercial Law', 'Negotiable Instruments',
  'Section 58, Act 2031',
  'Sec. 58, Act 2031 (Negotiable Instruments Law)', true
),
(
  'What is a crossed check and what are its legal effects?',
  'A crossed check has two parallel diagonal lines drawn on its face. Effects: (1) The check may not be encashed over the counter — it can only be deposited in a bank account. (2) The check may be negotiated only once to one who has an account with a bank. (3) The act of crossing puts the holder on notice that the check was issued for a definite purpose.',
  'There are two types of crossing: (a) General crossing — parallel lines with "and Co." or "not negotiable" between them, payable only through a bank; (b) Special crossing — the name of a specific bank is written between the lines, payable only through that bank.',
  'definition', 'medium', 'bar_exam', 'Commercial Law', 'Negotiable Instruments',
  'Section 185, Act 2031; HSBC v. CA',
  'Sec. 185, Act 2031; Bataan Cigar v. CA', true
),

-- ============================================================
-- LABOR LAW (30 questions)
-- ============================================================
(
  'What is the doctrine of management prerogative and its limitations?',
  'Management prerogative refers to the inherent right of an employer to regulate all aspects of employment, including hiring, work assignments, working methods, processes, work schedules, transfer of employees, lay-off, and discipline. Limitations: (1) it must not be exercised in a manner contrary to law, morals, good customs, or public policy; (2) must not be used as a subterfuge for union-busting; (3) must be exercised in good faith; (4) must not result in grave abuse of discretion.',
  'Management prerogative is not absolute. The employer''s exercise is valid only when it is done in good faith and not to defeat or circumvent the rights of employees. The Supreme Court applies a reasonableness test.',
  'definition', 'medium', 'bar_exam', 'Labor Law', 'Employment Relations',
  'Article 100, Labor Code; San Miguel v. Laguesma',
  'Art. 100, Labor Code; Management Prerogative Doctrine', true
),
(
  'What are the just causes for termination of employment under the Labor Code?',
  'Under Article 297 of the Labor Code, just causes for termination are: (1) serious misconduct or willful disobedience; (2) gross and habitual neglect of duties; (3) fraud or willful breach of trust; (4) commission of a crime against employer or immediate family; (5) other analogous causes. For just causes, the employer need not pay separation pay (only backwages if dismissal is illegal).',
  'Just causes arise from the employee''s own fault or conduct. The twin-notice rule applies: first notice specifying the ground for termination, opportunity to be heard, then second notice of decision. Violation of procedure makes dismissal ineffectual though substantively valid.',
  'enumeration', 'medium', 'bar_exam', 'Labor Law', 'Termination of Employment',
  'Article 297, Labor Code (formerly Art. 282)',
  'Art. 297, Labor Code (RA 10151 renumbering)', true
),
(
  'What are the authorized causes for termination under the Labor Code?',
  'Authorized causes under Article 298 are: (1) installation of labor-saving devices; (2) redundancy; (3) retrenchment to prevent losses; (4) closure or cessation of business not due to serious losses; (5) disease where continued employment is prejudicial to employee or co-workers. Authorized causes require 30 days prior notice to both the employee and DOLE, and payment of separation pay.',
  'Unlike just causes, authorized causes arise from business necessity, not employee fault. Separation pay is required: one month pay per year or half-month per year depending on the cause. Payment of 30-day notice pay is also required if notice is not given.',
  'enumeration', 'medium', 'bar_exam', 'Labor Law', 'Termination of Employment',
  'Article 298, Labor Code (formerly Art. 283)',
  'Art. 298, Labor Code', true
),
(
  'What is the twin-notice rule in labor law?',
  'The twin-notice rule requires that before dismissal on just causes, the employer must give the employee: (1) FIRST NOTICE — a written notice specifying the grounds for dismissal and giving the employee a reasonable opportunity (at least 5 days) to explain his side; and (2) SECOND NOTICE — a written notice of dismissal after due consideration of the employee''s explanation. Failure to observe the twin-notice rule renders the dismissal procedurally infirm.',
  'While the substantive validity of the dismissal is separate from its procedural requirements, failure to comply with the twin-notice rule entitles the employee to nominal damages (P30,000 for violation of due process per Agabon doctrine).',
  'definition', 'hard', 'bar_exam', 'Labor Law', 'Due Process in Dismissal',
  'Article 292, Labor Code; Agabon v. NLRC (2004)',
  'Art. 292, Labor Code; Agabon v. NLRC, G.R. No. 158693', true
),
(
  'What is constructive dismissal?',
  'Constructive dismissal exists when there is cessation of work because continued employment is rendered impossible, unreasonable, or unlikely; when there is a demotion in rank or a diminution in pay; or when a clear discrimination, insensibility, or disdain by the employer becomes unbearable to the employee and leaves him no choice but to resign. The test is whether a reasonable person in the employee''s position would feel compelled to resign.',
  'Constructive dismissal is treated as illegal dismissal. The employee who resigns due to constructive dismissal is entitled to full backwages, reinstatement (or separation pay in lieu), and other benefits.',
  'definition', 'hard', 'bar_exam', 'Labor Law', 'Termination of Employment',
  'Reconstructive dismissal doctrine; Globe Telecom v. Florendo',
  'Constructive Dismissal Doctrine; Art. 297, Labor Code', true
),
(
  'What is the security of tenure principle?',
  'Security of tenure means that a regular employee cannot be dismissed except for just or authorized causes and only after due process. An employee who has been engaged to perform activities which are usually necessary or desirable in the usual business or trade of the employer shall be considered a regular employee after 6 months of probationary service. Once regular, the employee cannot be dismissed without valid cause.',
  'This is a constitutional right (Art. XIII, Sec. 3, 1987 Constitution). It applies to all employees regardless of position. The constitutional mandate is reflected in the Labor Code requirements for just and authorized causes plus due process.',
  'definition', 'medium', 'bar_exam', 'Labor Law', 'Security of Tenure',
  'Article XIII, Section 3, 1987 Constitution; Articles 294-297, Labor Code',
  'Art. XIII, Sec. 3, 1987 Constitution; Art. 294, Labor Code', true
),
(
  'What is the four-fold test for employer-employee relationship?',
  'The four-fold test examines: (1) SELECTION AND ENGAGEMENT — the employer selects and hires the employee; (2) PAYMENT OF WAGES — the employer pays the employee wages or salary; (3) POWER OF DISMISSAL — the employer has the power to terminate the employment; (4) POWER OF CONTROL — the employer controls the employee not only as to the result of the work but also as to the means and methods by which the work is accomplished. The CONTROL TEST is the most important element.',
  'The control test distinguishes employment from a contractor relationship. The presence of control over both the means and ends of work is the determining factor. An independent contractor controls the means and methods; an employee merely controls results.',
  'enumeration', 'medium', 'bar_exam', 'Labor Law', 'Employer-Employee Relationship',
  'Four-fold Test; Insular Life v. NLRC (1989)',
  'Four-fold Test; Insular Life Assurance v. NLRC', true
),
(
  'What are the elements of a valid strike?',
  'A valid strike requires: (1) a NOTICE OF STRIKE filed with the NCMB at least 30 days before the intended date of strike (for bargaining deadlock) or 15 days (for unfair labor practice); (2) strike vote approval by a majority of union members voting by secret ballot; (3) submission of the strike vote results to NCMB at least 7 days before the intended date; (4) cooling-off period must be observed; and (5) the strike must not be prohibited under law (e.g., in essential services).',
  'A strike that fails any procedural requirement is an illegal strike. Workers who participate in an illegal strike may be declared to have lost employment status. Union officers who knowingly participate in an illegal strike may be terminated.',
  'enumeration', 'hard', 'bar_exam', 'Labor Law', 'Labor Relations',
  'Articles 278-279, Labor Code; No-Strike Clause',
  'Arts. 278-279, Labor Code (as renumbered)', true
),
(
  'What is the principle of non-diminution of benefits?',
  'The principle of non-diminution of benefits (Article 100, Labor Code) prohibits employers from eliminating or reducing existing employee benefits that have ripened into company practice. A benefit becomes a company practice when: (1) it is given over a long period of time; (2) it is consistent and deliberate; and (3) it is not given by mistake.',
  'Even if a benefit is not required by law, once it has been given consistently and deliberately, the employer cannot unilaterally reduce or withdraw it. The test is whether the benefit is given with the intent to make it a company policy.',
  'definition', 'medium', 'bar_exam', 'Labor Law', 'Employee Benefits',
  'Article 100, Labor Code',
  'Art. 100, Labor Code (Non-diminution of Benefits)', true
),
(
  'What is a union security clause?',
  'A union security clause is a provision in a collective bargaining agreement (CBA) that requires membership in the contracting union as a condition of employment. Types: (1) CLOSED SHOP — only union members can be hired; (2) UNION SHOP — non-union employees hired must join the union within a specified period; (3) MAINTENANCE OF MEMBERSHIP — employees who are union members at the time the CBA is signed must remain members for the duration of the CBA.',
  'Union security clauses are valid and enforceable. When an employee is expelled from the union for non-compliance with the clause, the employer is obligated to terminate the employee upon written request by the union, provided the expulsion was due to failure to pay dues or comply with membership requirements (not for other reasons).',
  'definition', 'hard', 'bar_exam', 'Labor Law', 'Collective Bargaining',
  'Articles 292 and 277, Labor Code',
  'Arts. 292, 277, Labor Code; Union Security Clause', true
),

-- ============================================================
-- TAX LAW (25 questions)
-- ============================================================
(
  'What is the NIRC definition of gross income?',
  'Under Section 32(A) of the NIRC, gross income means all income derived from whatever source, including: (1) compensation for services; (2) gross income derived from business; (3) gains derived from dealings in property; (4) interests; (5) rents; (6) royalties; (7) dividends; (8) annuities; (9) prizes and winnings; (10) pensions; and (11) partner''s distributive share from the net income of the general professional partnership.',
  'The NIRC adopts the all-inclusive concept of income. Section 32(B) enumerates exclusions from gross income (e.g., gifts, bequests, devises, life insurance proceeds paid by reason of death, retirement benefits under RA 7641).',
  'definition', 'medium', 'bar_exam', 'Taxation', 'Income Taxation',
  'Section 32, National Internal Revenue Code (NIRC)',
  'Sec. 32, NIRC (RA 8424 as amended)', true
),
(
  'Distinguish a tax from a license fee.',
  'A TAX is a forced charge, imposition, or contribution assessed in accordance with legislative authority for the support of the government. A LICENSE FEE is a charge imposed as a condition for the exercise of a privilege or right. Key distinctions: (1) Purpose — tax is for revenue; license fee is for regulation; (2) Basis — tax is based on capacity; license fee is on the exercise of the privilege; (3) Amount — tax is determined by the government; license fee must be proportionate to regulation cost; (4) Non-payment — non-payment of tax results in penalty; non-payment of license fee may result in revocation of license.',
  'The distinction is important because: (a) taxes are protected by due process and equal protection; (b) license fees for businesses that are per se illegal are void; (c) a tax disguised as a license fee (excessive) is unconstitutional.',
  'distinction', 'hard', 'bar_exam', 'Taxation', 'Basic Principles of Taxation',
  'Constitutional Law and Tax Law; Osmeña v. Orbos',
  'Basic Tax Principles; 1987 Constitution, Art. VI, Sec. 28', true
),
(
  'What is the doctrine of equitable recoupment in taxation?',
  'The doctrine of equitable recoupment provides that a claim for refund of taxes already barred by prescription can be allowed to offset a tax liability still open and due, and vice versa. However, this doctrine is NOT recognized in Philippine jurisdiction. The Supreme Court in Republic v. Mambulao Lumber Co. held that there can be no set-off of taxes against debts owed by the government because taxes are not debts.',
  'In the Philippines, taxes are not subject to set-off or compensation because the government and the taxpayer are not mutual creditors and debtors of each other. A claim for refund of taxes must be filed within 2 years from date of payment (Sec. 229, NIRC).',
  'definition', 'hard', 'bar_exam', 'Taxation', 'Tax Remedies',
  'Section 229, NIRC; Republic v. Mambulao Lumber Co.',
  'Sec. 229, NIRC; Republic v. Mambulao Lumber, G.R. No. L-17725', true
),
(
  'What are the requisites for a valid tax?',
  'A valid tax must: (1) be for a PUBLIC PURPOSE — the revenue raised must be used for the general welfare; (2) be levied by the TAXING AUTHORITY — the legislature (Congress or delegated authority); (3) be UNIFORM AND EQUITABLE — must be uniform within the same class; (4) be PROPORTIONATE — not in excess of what is needed; (5) NOT BE CONFISCATORY — must not amount to a taking of property; (6) comply with DUE PROCESS — adequate notice and opportunity to be heard; and (7) not VIOLATE EQUAL PROTECTION.',
  'These requirements flow from the constitutional limitations on the power to tax. A tax that is not for a public purpose is void. A tax that is confiscatory violates due process. The test for a reasonable classification for tax purposes is that it must be based on substantial distinction, germane to the purpose, not limited to existing conditions, and applies to all members of the same class.',
  'enumeration', 'medium', 'bar_exam', 'Taxation', 'Basic Principles of Taxation',
  'Article VI, Section 28, 1987 Constitution; NIRC',
  'Art. VI, Sec. 28, 1987 Constitution; Commissioner v. Algue', true
),
(
  'What is the fruit of the poisonous tree doctrine in tax law?',
  'While this doctrine originated in constitutional criminal law (exclusionary rule), it has tax law implications. In BIR investigations, evidence obtained through unlawful search and seizure is inadmissible against the taxpayer. A warrant of distraint or levy obtained through fraud or without following due process may be set aside. The BIR must follow statutory requirements (LOA - Letter of Authority) before conducting examinations.',
  'A Letter of Authority (LOA) is required before a BIR examiner can audit a taxpayer. Evidence gathered without a valid LOA is inadmissible. The Supreme Court has struck down BIR assessments based on unauthorized investigations.',
  'definition', 'hard', 'bar_exam', 'Taxation', 'Tax Administration',
  'NIRC Sections 6, 10; CIR v. Sony Philippines',
  'NIRC; CIR v. Sony Philippines, G.R. No. 178697', true
),
(
  'What is the difference between tax avoidance and tax evasion?',
  'TAX AVOIDANCE (or tax planning) is the use of legally permissible means to reduce or avoid tax liability. It is the exploitation of legally allowable methods and deductions to minimize tax. It is LEGAL. TAX EVASION is the use of illegal means to escape the payment of taxes — making false statements, fraud, failure to declare income. It is ILLEGAL and constitutes a criminal offense under the NIRC.',
  'Tax avoidance cannot be penalized because taxpayers have the right to structure their affairs to minimize tax within the bounds of law (Gregory v. Helvering principle). Tax evasion is punishable by imprisonment of 6 to 10 years plus fines under Section 254 of the NIRC.',
  'distinction', 'medium', 'bar_exam', 'Taxation', 'Tax Offenses',
  'Section 254, NIRC; Tax Avoidance vs. Evasion',
  'Sec. 254, NIRC; CIR v. Estate of Benigno Toda, Jr.', true
),

-- ============================================================
-- CONSTITUTIONAL LAW — Additional (20 questions)
-- ============================================================
(
  'What is the political question doctrine?',
  'The political question doctrine holds that certain questions, by their nature, are best left to the political branches of government — the executive and legislative — and are not justiciable by the courts. A question is political when it involves the exercise of a discretionary power vested in the political departments, and the Constitution has committed its resolution exclusively to those branches.',
  'Under the 1987 Constitution, the Supreme Court can review acts of the other branches for grave abuse of discretion (expanded judicial power). The political question doctrine has been narrowed. Baker v. Carr (US) identifies factors: textually committed to another branch, lack of judicially manageable standards.',
  'definition', 'hard', 'bar_exam', 'Constitutional Law', 'Judicial Power',
  'Article VIII, Section 1, 1987 Constitution',
  'Art. VIII, Sec. 1, 1987 Constitution; Tañada v. Cuenco', true
),
(
  'What is the doctrine of operative fact?',
  'The doctrine of operative fact recognizes that before a law is declared unconstitutional by the Supreme Court, it is an operative fact that had produced effects and consequences. The declaration of unconstitutionality does not undo everything done while the law was in operation — particularly acts done pursuant to the law that were valid and legal when performed. However, this doctrine applies as an equitable principle and is not of absolute application.',
  'The doctrine prevents unjust enrichment and chaos when statutes are invalidated. It protects innocent parties who relied on the unconstitutional law before its invalidation. It does NOT apply when: (a) the law was void from the beginning (not merely declared unconstitutional); (b) there is no equitable reason to apply it.',
  'definition', 'hard', 'bar_exam', 'Constitutional Law', 'Judicial Review',
  'Doctrine of Operative Fact; Planters Products v. Fertiphil',
  'Operative Fact Doctrine; Planters Products v. Fertiphil Corp.', true
),
(
  'What are the requisites for a valid exercise of police power?',
  'The exercise of police power is valid when: (1) the interest of the public generally — not just a particular class — requires its exercise (public interest requirement); and (2) the means employed are reasonably necessary for the accomplishment of the purpose and not unduly oppressive (means-end test). The law must not: violate constitutional provisions, be arbitrary or unreasonable, discriminate unjustly.',
  'Police power is the most pervasive and the least limitable of the fundamental powers. It cannot be bargained away by contract. The test of its validity is the reasonableness of the regulation to the public interest served. Courts give great deference to legislative and executive determinations of what constitutes a proper exercise.',
  'enumeration', 'medium', 'bar_exam', 'Constitutional Law', 'Police Power',
  'Police Power; Ynot v. IAC (1987)',
  'Police Power; Ynot v. Intermediate Appellate Court, G.R. No. 74457', true
),
(
  'What is the void-for-vagueness doctrine?',
  'A law is void for vagueness when it lacks comprehensible standards that men of common intelligence would understand, and thus allows for arbitrary enforcement. A vague law violates: (1) DUE PROCESS — fails to give fair notice of the conduct punished; (2) FREE SPEECH — has a chilling effect on constitutionally protected speech. Courts apply strict scrutiny to vague laws that burden fundamental rights.',
  'The doctrine is distinct from the overbreadth doctrine (which applies to laws that sweep too broadly, burdening both protected and unprotected conduct). Vagueness relates to notice; overbreadth relates to scope. Philippine courts apply both doctrines especially in criminal law and free speech contexts.',
  'definition', 'hard', 'bar_exam', 'Constitutional Law', 'Due Process',
  'Void-for-Vagueness Doctrine; Disini v. Secretary of Justice (2014)',
  'Due Process; Disini v. Secretary of Justice, G.R. No. 203335', true
),
(
  'What is the doctrine of exhaustion of administrative remedies?',
  'Before a party can seek judicial review, he must first exhaust all available administrative remedies. Administrative officers should be given an opportunity to correct errors committed in their official capacity before courts intervene. Failure to exhaust administrative remedies results in dismissal of the case for lack of cause of action or premature resort to courts.',
  'EXCEPTIONS: exhaustion is not required when (1) the question is purely legal; (2) the administrative remedy is inadequate; (3) irreparable damage will result; (4) the administrative act is patently illegal; (5) administrative appeal is futile; (6) the respondent is an alter ego of the President; (7) there is urgency.',
  'definition', 'medium', 'bar_exam', 'Constitutional Law', 'Administrative Law',
  'Exhaustion of Administrative Remedies Doctrine',
  'Exhaustion Doctrine; Vda. de Tan v. Veterans Backpay Commission', true
),
(
  'What are the elements of eminent domain?',
  'Eminent domain (expropriation) requires: (1) taking must be by the STATE (or its delegate); (2) taking must be for PUBLIC USE or benefit; (3) there must be PAYMENT OF JUST COMPENSATION; (4) DUE PROCESS must be observed. Just compensation is the fair market value of the property at the time of taking, plus consequential damages minus consequential benefits, but in no case less than zero.',
  'The right of eminent domain is inherent in the State and does not need constitutional grant. The constitutional requirement is that just compensation must be paid. The judiciary determines just compensation — this is a judicial question not subject to legislative or executive prescription.',
  'enumeration', 'medium', 'bar_exam', 'Constitutional Law', 'Eminent Domain',
  'Article III, Section 9, 1987 Constitution',
  'Art. III, Sec. 9, 1987 Constitution; Republic v. CA', true
),

-- ============================================================
-- CIVIL LAW — Additional (25 questions)
-- ============================================================
(
  'What is the principle of relativity of contracts?',
  'Under Article 1311 of the Civil Code, contracts take effect only between the parties, their assigns, and heirs, except in cases where the rights and obligations arising from the contract are not transmissible by their nature, by stipulation, or by provision of law. A contract cannot bind persons who are not parties to it.',
  'EXCEPTIONS: (1) Stipulation pour autrui — a stipulation in favor of a third party who has accepted before revocation; (2) contracts creating real rights — bind third parties; (3) accion pauliana — creditors may attack contracts in fraud of their rights; (4) status contracts.',
  'definition', 'medium', 'bar_exam', 'Civil Law', 'Contracts',
  'Article 1311, Civil Code',
  'Art. 1311, Civil Code of the Philippines', true
),
(
  'What is stipulation pour autrui?',
  'A stipulation pour autrui is a provision in a contract conferring a benefit (favor) upon a third person who is not a party to the contract. For it to be valid: (1) the third person must be clearly and deliberately conferred a favor; (2) there must be no compensation or condition imposed; (3) the third person communicates acceptance before revocation; (4) neither of the contracting parties bears the legal representation of the third person.',
  'The doctrine allows third parties to demand fulfillment of the contract in their favor once they have accepted the benefit. If acceptance is not communicated, the contracting parties may revoke the stipulation at any time before acceptance.',
  'definition', 'medium', 'bar_exam', 'Civil Law', 'Contracts',
  'Article 1311, Civil Code',
  'Art. 1311, Civil Code; Florentino v. Encarnacion', true
),
(
  'What is the concept of quasi-contract?',
  'A quasi-contract is a juridical relation arising from certain lawful, voluntary, and unilateral acts to the end that no one shall be unjustly enriched at the expense of another. The two most important quasi-contracts are: (1) NEGOTIORUM GESTIO — the voluntary management of another''s business or property without the owner''s authority, when the owner is absent or incapacitated; (2) SOLUTIO INDEBITI — the payment by mistake of a thing not due, creating an obligation to return it.',
  'Quasi-contracts are governed by the principle of unjust enrichment (nemo cum alterius detrimento locupletari potest). They are not contracts because there is no meeting of minds, but the law imposes obligations similar to those of contracts.',
  'definition', 'medium', 'bar_exam', 'Civil Law', 'Quasi-Contracts',
  'Articles 2142-2175, Civil Code',
  'Arts. 2142-2175, Civil Code of the Philippines', true
),
(
  'What is the concept of mora and its types?',
  'Mora is the delay or default in the performance of an obligation. Types: (1) MORA SOLVENDI — delay by the debtor in fulfilling an obligation to give or to do; (2) MORA ACCIPIENDI — delay by the creditor in accepting the performance; (3) COMPENSATIO MORAE — when both debtor and creditor are in delay, neither is in default. For mora solvendi to arise: (a) the obligation must be due and demandable; (b) there must be non-performance; (c) there must be a demand (except when demand is unnecessary).',
  'Demand is not necessary for delay when: (a) the obligation expressly states a time for fulfillment; (b) the law provides it; (c) demand would be useless; (d) the debtor has acknowledged being in default.',
  'definition', 'medium', 'bar_exam', 'Civil Law', 'Obligations',
  'Article 1169, Civil Code',
  'Art. 1169, Civil Code of the Philippines', true
),
(
  'What is the contract of sale vs. contract to sell?',
  'In a CONTRACT OF SALE, title passes to the buyer upon delivery of the object. The vendor''s breach does not automatically resolve the contract — the vendee must bring an action for resolution. In a CONTRACT TO SELL, ownership is retained by the seller until full payment of the purchase price. The non-payment of the purchase price is a suspensive condition, the fulfillment of which prevents the obligation from arising. Non-payment ipso jure prevents the obligation from becoming effective.',
  'The distinction is critical: in contract to sell, failure to pay allows seller to consider contract cancelled without court action; in contract of sale, seller must go to court (Art. 1592 for immovables). Republic Act 6552 (Maceda Law) provides additional protections for buyers on installment of residential properties.',
  'distinction', 'hard', 'bar_exam', 'Civil Law', 'Contracts',
  'Articles 1458, 1592, Civil Code; Luzon Brokerage v. Maritime',
  'Arts. 1458, 1592, Civil Code; Luzon Brokerage v. Maritime Bldg.', true
),
(
  'What is the concept of dacion en pago?',
  'Dacion en pago (dation in payment) is a mode of extinguishing an obligation whereby the debtor alienates in favor of the creditor property for the satisfaction of a monetary debt. The law on sales governs it because there is a transmission of ownership. The essential elements are: (1) there is a money obligation; (2) the debtor alienates property to the creditor; (3) there is satisfaction of the money obligation by the delivery of the property.',
  'Dacion en pago requires the consent of both parties. It extinguishes the obligation to the extent of the value of the thing delivered. If the value of the thing is less than the debt, there is no complete extinguishment unless there is express agreement.',
  'definition', 'medium', 'bar_exam', 'Civil Law', 'Obligations',
  'Article 1245, Civil Code',
  'Art. 1245, Civil Code of the Philippines; Filinvest Credit v. Philippine Acetylene', true
),
(
  'What is the rule on double sales?',
  'Article 1544 of the Civil Code provides that in double sales of the same object: (1) MOVABLE PROPERTY — ownership is transferred to the person who first took possession in good faith; (2) IMMOVABLE PROPERTY — ownership belongs to the person who first recorded it in the Registry of Property in good faith; if no registration, to the person who first possessed in good faith; if no possession, to the person with the oldest title in good faith.',
  'The good faith requirement means the buyer had no knowledge of the previous sale. If a buyer registers first but with knowledge of the prior sale, he is in bad faith and cannot prevail. The buyer who first acquires knowledge of the second sale is in bad faith.',
  'definition', 'hard', 'bar_exam', 'Civil Law', 'Contracts',
  'Article 1544, Civil Code',
  'Art. 1544, Civil Code; Radiowealth Finance v. Del Rosario', true
),

-- ============================================================
-- REMEDIAL LAW — Additional (20 questions)
-- ============================================================
(
  'What are the elements of res judicata?',
  'Res judicata (bar by prior judgment) requires: (1) there is a final judgment or order; (2) the court rendering it had jurisdiction over the subject matter and the parties; (3) it is a judgment or order on the merits; and (4) there is identity of parties, subject matter, and causes of action between the two cases. The effect is that the judgment in the first case is conclusive in the second on all matters raised or which could have been raised.',
  'Res judicata is distinguished from CONCLUSIVENESS OF JUDGMENT (collateral estoppel) where there is no identity of causes of action. In conclusiveness of judgment, only the issues actually decided are conclusive in subsequent cases, even if the causes of action are different.',
  'enumeration', 'hard', 'bar_exam', 'Remedial Law', 'Civil Procedure',
  'Rule 39, Section 47, Rules of Court',
  'Sec. 47, Rule 39, Rules of Court; Nabus v. CA', true
),
(
  'What is the doctrine of forum shopping?',
  'Forum shopping is the filing of multiple suits in different courts or tribunals involving the same parties for the same cause of action, either simultaneously or successively, to obtain a favorable judgment. It is prohibited because it defeats the purpose of orderly administration of justice and may result in conflicting decisions. The test is whether there is: (1) identity of parties; (2) identity of rights asserted and relief prayed for; (3) identity of the two preceding particulars such that any judgment in the pending cases would be res judicata.',
  'Forum shopping is a ground for dismissal of the case. The certification against forum shopping (certfication under oath) must be attached to every initiatory pleading. Willful and deliberate forum shopping may result in contempt of court and dismissal of the case with prejudice.',
  'definition', 'hard', 'bar_exam', 'Remedial Law', 'Civil Procedure',
  'Rule 7, Section 5, Rules of Court',
  'Sec. 5, Rule 7, Rules of Court; Prubankers v. Prudential Bank', true
),
(
  'What is locus standi?',
  'Locus standi (legal standing) is the right of a party to appear and be heard in court. A party has standing if: (1) he has sustained or is in imminent danger of sustaining a direct injury as a result of the governmental act challenged; (2) the injury is traceable to the challenged action; and (3) the injury will be redressed by a favorable ruling. In constitutional cases, the Court may relax the standing requirement when a transcendental or paramount public interest is involved.',
  'Taxpayers have standing to question the illegal use of public funds. Voters have standing to question election laws. Citizens have standing to challenge acts that infringe on fundamental constitutional rights. The concept ensures that courts do not render advisory opinions on abstract questions.',
  'definition', 'medium', 'bar_exam', 'Remedial Law', 'Civil Procedure',
  'Locus Standi Doctrine; David v. Macapagal-Arroyo',
  'Locus Standi; David v. Macapagal-Arroyo, G.R. No. 171396', true
),
(
  'What is the writ of habeas corpus and when can it be issued?',
  'Habeas corpus is a writ directed to the person detaining another, commanding him to produce the body of the prisoner and to show the cause of his detention. It can be issued: (1) when a person is illegally deprived of his liberty; (2) when the rightful custody of any person is withheld from the person entitled to it. The privilege of habeas corpus may be suspended only in cases of invasion or rebellion when public safety requires it (Article VII, Section 18, 1987 Constitution).',
  'The proper court is the Supreme Court, Court of Appeals, or a Regional Trial Court within whose jurisdiction the person is detained. It cannot be used to obtain release from lawful confinement or to review a judgment of conviction. It is available even after conviction if the sentence has expired.',
  'definition', 'medium', 'bar_exam', 'Remedial Law', 'Special Proceedings',
  'Rule 102, Rules of Court; Article VII, Section 18, 1987 Constitution',
  'Rule 102, Rules of Court; Art. VII, Sec. 18, 1987 Constitution', true
),
(
  'What is the writ of amparo?',
  'The writ of amparo is a remedy available to any person whose right to life, liberty, and security is violated or threatened with violation by an unlawful act or omission of a public official or employee, or of a private individual or entity. It was promulgated by the Supreme Court in 2007 (A.M. No. 07-9-12-SC) to address extrajudicial killings and enforced disappearances.',
  'The writ of amparo covers cases of: (1) extrajudicial killings; (2) enforced disappearances; (3) threats of such acts. The respondent bears the burden of proving by extraordinary diligence that no violation occurred. Interim reliefs available include: inspection order, production order, temporary protection order.',
  'definition', 'hard', 'bar_exam', 'Remedial Law', 'Special Proceedings',
  'A.M. No. 07-9-12-SC, Rule on the Writ of Amparo',
  'A.M. No. 07-9-12-SC (Writ of Amparo, Oct. 24, 2007)', true
),

-- ============================================================
-- CRIMINAL LAW — Additional (20 questions)
-- ============================================================
(
  'What is the Indeterminate Sentence Law and when does it apply?',
  'The Indeterminate Sentence Law (Act 4103, as amended) requires that courts impose an indeterminate sentence with a minimum and maximum term. For offenses punished by the RPC: minimum is within the range of the penalty one degree lower than the prescribed penalty; maximum is the penalty prescribed after considering all aggravating and mitigating circumstances. For offenses punished by special laws: minimum is not less than the minimum of the prescribed penalty; maximum is not more than the maximum.',
  'The ISL is mandatory unless: (1) the penalty is death or life imprisonment (reclusion perpetua); (2) the offense is treason, misprision of treason, rebellion, or sedition; (3) the offense is piracy; (4) habitual delinquents; (5) persons who escaped from confinement or evaded service; (6) those granted conditional pardon who violated conditions.',
  'definition', 'hard', 'bar_exam', 'Criminal Law', 'Penalties',
  'Act 4103, Indeterminate Sentence Law',
  'Act 4103 (as amended by Act 4225), Indeterminate Sentence Law', true
),
(
  'What is the rule on conspiracy in criminal law?',
  'Under Article 8 of the RPC, conspiracy exists when two or more persons come to an agreement concerning the commission of a felony and decide to commit it. When conspiracy is established, all conspirators are equally liable regardless of the degree of their participation. The act of one is the act of all. Conspiracy as a CRIME must be expressly penalized by law (e.g., conspiracy to commit treason). Conspiracy as a MEANS OF COMMITTING A CRIME merely determines the liability of co-conspirators.',
  'Conspiracy may be inferred from the concerted acts of the accused. It need not be proved by direct evidence. The quantum of proof required is proof beyond reasonable doubt. A conspirator who desists before the crime is committed is not liable IF he made sincere efforts to prevent the crime.',
  'definition', 'hard', 'bar_exam', 'Criminal Law', 'Conspiracy',
  'Article 8, Revised Penal Code',
  'Art. 8, Revised Penal Code', true
),
(
  'What is the rule on impossible crime?',
  'An impossible crime (Article 4(2), RPC) exists when a person performs acts which would ordinarily constitute a felony against person or property, but which produce no effect because: (1) the commission of the felony is inherently impossible — due to the employment of inadequate or ineffectual means (e.g., using sugar believing it to be poison); or (2) the act is aimed at an inexistent crime (e.g., stabbing a corpse). The offender is still punished (arresto mayor and fine) as social defense.',
  'The purpose of punishing impossible crimes is social defense — to deter persons with criminal tendency. The offender must have criminal intent. The crime is impossible either because: (a) the object is inexistent; or (b) means employed are insufficient. Not applicable when the acts constitute another offense.',
  'definition', 'medium', 'bar_exam', 'Criminal Law', 'Felonies',
  'Article 4(2), Revised Penal Code',
  'Art. 4, par. 2, Revised Penal Code', true
),
(
  'What is treachery (alevosia) as a qualifying circumstance in murder?',
  'Treachery (alevosia) under Article 14(16) of the RPC is the employment of means, methods, or forms in the execution of the crime which tend directly and specially to ensure its execution WITHOUT RISK to himself arising from the defense which the offended party might make. Two conditions: (1) the method of attack must give the victim no opportunity to defend himself; (2) the method must be deliberately and consciously adopted.',
  'Treachery qualifies a killing to murder (Art. 248). It must be present at the inception of the attack. If the attack was impulsive and the method was not deliberately chosen, there is no treachery. Treachery cannot be appreciated when the victim was warned or the attack was frontal and preceded by a heated discussion.',
  'definition', 'hard', 'bar_exam', 'Criminal Law', 'Qualifying Circumstances',
  'Articles 14(16) and 248, Revised Penal Code',
  'Art. 14(16), 248, Revised Penal Code', true
),
(
  'What are the elements of rape under RA 8353 (Anti-Rape Law)?',
  'Rape under RA 8353 (now Article 266-A, RPC) is committed by: (1) a man who has carnal knowledge of a woman through force, threat, or intimidation; (2) when the woman is deprived of reason or unconscious; (3) by fraudulent machination or grave abuse of authority; (4) when the woman is under 12 years of age or demented — regardless of circumstances (statutory rape). Also: (5) by any person who inserts his penis into another person''s mouth or anal orifice; (6) any person who inserts any instrument or object into the genital or anal orifice — by force, threat, or intimidation.',
  'RA 8353 expanded rape to include sexual assault (acts other than penile-vaginal penetration). Rape is now a crime against persons, not just a crime against chastity. The husband can be convicted of raping his wife. Marital rape is expressly recognized.',
  'enumeration', 'hard', 'bar_exam', 'Criminal Law', 'Special Laws',
  'Article 266-A, Revised Penal Code (as amended by RA 8353)',
  'Art. 266-A, RPC; RA 8353 (Anti-Rape Law of 1997)', true
),

-- ============================================================
-- LEGAL ETHICS — Additional (15 questions)
-- ============================================================
(
  'What is the lawyer''s duty of candor to the tribunal?',
  'Under Canon 10 of the Code of Professional Responsibility, a lawyer owes candor, fairness, and good faith to the court. Specific duties: (1) Rule 10.01 — shall not do any falsehood nor consent to the doing of any in court; (2) Rule 10.02 — shall not knowingly misquote or misrepresent the contents of a paper, the language or the argument of opposing counsel, or the text of a decision or authority; (3) Rule 10.03 — shall observe the rules of procedure and shall not misuse them to defeat the ends of justice.',
  'The duty of candor overrides the duty of zealous advocacy. A lawyer must inform the court of directly adverse legal authority within the controlling jurisdiction, even if not cited by the opposing party. Knowingly citing overruled authority is a breach of this duty.',
  'definition', 'medium', 'bar_exam', 'Legal Ethics', 'Duties to the Court',
  'Canon 10, Code of Professional Responsibility',
  'Canon 10, Code of Professional Responsibility (CPR)', true
),
(
  'What is the attorney-client privilege?',
  'The attorney-client privilege protects confidential communications made in confidence by a client to his attorney in the course of professional employment. Elements: (1) there was an attorney-client relationship; (2) the communication was confidential; (3) it was made in the course of professional employment; (4) the client has not waived the privilege. The purpose is to encourage clients to communicate fully with their lawyers without fear of disclosure.',
  'The privilege belongs to the CLIENT, not the lawyer. The lawyer cannot disclose without client consent. Exceptions: (a) client has waived it; (b) communication was made in furtherance of future crime or fraud; (c) the communication relates to a breach of duty between attorney and client.',
  'definition', 'medium', 'bar_exam', 'Legal Ethics', 'Attorney-Client Relationship',
  'Rule 130, Section 24(b), Rules of Court',
  'Sec. 24(b), Rule 130, Rules of Court; Canon 21, CPR', true
),
(
  'What is the rule on conflict of interest in legal practice?',
  'A lawyer shall not represent conflicting interests. Canon 15, Rule 15.03 of the CPR provides that a lawyer shall not represent conflicting interests except by written consent of all concerned given after a full disclosure of the facts. A conflict exists when: (1) the lawyer is required to advance adverse interests of two clients in the same matter; (2) the acceptance of a new engagement will require using confidential information from a former client; (3) there is any significant risk that representation will be materially limited by loyalty to another client.',
  'The prohibition extends to members of the lawyer''s firm. A law firm may not accept a case against a client of the firm on a closely related matter. The test is whether the lawyer would be asked to use against one client information obtained from another.',
  'definition', 'hard', 'bar_exam', 'Legal Ethics', 'Conflict of Interest',
  'Canon 15, Rule 15.03, Code of Professional Responsibility',
  'Rule 15.03, Canon 15, CPR; Samala v. Valencia', true
),
(
  'What are the grounds for disbarment or suspension of a lawyer?',
  'Under Rule 138, Section 27 of the Rules of Court, grounds for disbarment or suspension are: (1) deceit; (2) malpractice; (3) gross misconduct in office; (4) grossly immoral conduct; (5) conviction of a crime involving moral turpitude; (6) violation of the lawyer''s oath; (7) willful disobedience of any lawful order of a superior court; (8) corrupt or willful appearance as attorney for a party to a case without authority to do so.',
  'Disbarment proceedings are sui generis (neither civil nor criminal). The purpose is not punishment but to protect the public and the legal profession. The quantum of evidence is substantial evidence. The IBP recommends, but the Supreme Court has exclusive jurisdiction to disbar.',
  'enumeration', 'hard', 'bar_exam', 'Legal Ethics', 'Disciplinary Proceedings',
  'Rule 138, Section 27, Rules of Court',
  'Sec. 27, Rule 138, Rules of Court; In re: Atty. Saura', true
),
(
  'What is champerty and maintenance in legal ethics?',
  'MAINTENANCE is the officious intermeddling in a lawsuit by a person who has no interest therein by assisting either party with means to carry it on. CHAMPERTY is a species of maintenance where the maintainer shares in the proceeds of the litigation. In the Philippines, an attorney is prohibited from acquiring by assignment a client''s cause of action in litigation. A contract of champerty is void for being against public policy.',
  'The prohibition is found in Rule 138, Section 27 (malpractice). However, a contingency fee arrangement — where the lawyer is paid a percentage of the amount recovered only if successful — is NOT champerty if the attorney already had an interest in the case. The key distinction: champerty involves acquiring ownership of the claim.',
  'definition', 'hard', 'bar_exam', 'Legal Ethics', 'Prohibited Acts',
  'Rule 138, Section 27; Canon 16, CPR',
  'Rule 138, Sec. 27, Rules of Court; Corpus v. CA', true
)

ON CONFLICT DO NOTHING;
