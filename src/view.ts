import { terminal, expenses } from '.';
import { ExpenseCategory } from './public/data';
import { createExpense, getAllExpenses, getTotalAmount, getExpensesByCategory } from './service';

export function showMenu() {
  console.log(`
1. Додати витрату
2. Переглянути витрати
3. Розрахувати загальну суму
4. Відфільтрувати витрати за категорією
5. Закрити
`);
  terminal.question('Оберіть варіант: ', (choice: string) => {
    if (choice === '1') {
      addExpense();
    } else if (choice === '2') {
      viewExpenses();
    } else if (choice === '3') {
      calculateAmount();
    } else if (choice === '4') {
      filterByCategory();
    } else if (choice === '5') {
      terminal.close();
    } else {
      console.log('\x1b[31mНе вірний вибір. Спробуйте ще раз.\x1b[0m');
      showMenu();
    }
  });
}
function addExpense() {
  terminal.question('Введіть назву витрати: ', (name: string) => {
    terminal.question('Введіть суму: ', (amountStr: string) => {
      const amount = parseFloat(amountStr);
      if (isNaN(amount)) {
        console.log('\x1b[31mНевірна сума.\x1b[0m');
        return showMenu();
      }
      console.log('Оберіть категорію: Food, Transport, Entertainment, Fee, Friends, Sport');
      terminal.question('Введіть категорію: ', (category: string) => {
        if (!(category in ExpenseCategory)) {
          console.log('\x1b[31mНевірна категорія.\x1b[0m');
          return showMenu();
        }
        const expense = createExpense(name, amount, category as ExpenseCategory);
        expenses.push(expense);
        console.log('\x1b[32mВитрата додана.\x1b[0m');
        showMenu();
      });
    });
  });
}

function viewExpenses() {
  const allExpenses = getAllExpenses();
  console.log('\nВсі витрати:');
  allExpenses.forEach((exp) => {
    console.log(`${exp.id}. ${exp.name} - $${exp.amount} [${exp.category}] on ${exp.date.toLocaleDateString()}`);
  });
  showMenu();
}

function calculateAmount() {
  const totalAmount = getTotalAmount();
  console.log(`\nВсього витрачено: $${totalAmount}`);
  showMenu();
}

function filterByCategory() {
  console.log('Оберіть категорію: Food, Transport, Entertainment, Fee, Friends, Sport');
  terminal.question('Введіть категорію: ', (category: string) => {
    if (!(category in ExpenseCategory)) {
      console.log('\x1b[31mНевірна категорія.\x1b[0m');
      return showMenu();
    }
    const filteredExpenses = getExpensesByCategory(category as ExpenseCategory);
    console.log(`\nВитрат на категорію ${category}:`);
    filteredExpenses.forEach(exp => {
      console.log(`${exp.id}. ${exp.name} - $${exp.amount} on ${exp.date.toLocaleDateString()}`);
    });
    showMenu();
  });
}


