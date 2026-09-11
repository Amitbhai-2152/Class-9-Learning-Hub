from pathlib import Path
p=Path('src/ReasoningHubPremium.jsx')
s=p.read_text(encoding='utf-8')
# The one-shot expansion inserted blocks after the previous final make() without a comma.
s=s.replace(')\n\nmake(', '),\nmake(')
p.write_text(s,encoding='utf-8')
print('repaired')
