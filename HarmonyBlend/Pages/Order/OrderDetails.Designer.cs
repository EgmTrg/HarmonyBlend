namespace HarmonyBlend.Pages.Order
{
	partial class OrderDetails
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing) {
			if(disposing && (components != null)) {
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		#region Windows Form Designer generated code

		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent() {
			DataGridViewCellStyle dataGridViewCellStyle1 = new DataGridViewCellStyle();
			DataGridViewCellStyle dataGridViewCellStyle2 = new DataGridViewCellStyle();
			DataGridViewCellStyle dataGridViewCellStyle3 = new DataGridViewCellStyle();
			DataGridViewCellStyle dataGridViewCellStyle4 = new DataGridViewCellStyle();
			panel_Control = new Panel();
			panel8 = new Panel();
			minimize_button = new Button();
			maximaze_button = new Button();
			exit_button = new Button();
			loggedInUsername_label = new Label();
			panel1 = new Panel();
			totalPayment_label = new Label();
			totalOrderCount_label = new Label();
			label6 = new Label();
			label5 = new Label();
			totalPriceCheck_checkBox = new CheckBox();
			edit_button = new Button();
			confirm_button = new Button();
			panel2 = new Panel();
			dataGridView1 = new DataGridView();
			PName = new DataGridViewTextBoxColumn();
			Amount = new DataGridViewTextBoxColumn();
			Unit = new DataGridViewTextBoxColumn();
			ListPrice = new DataGridViewTextBoxColumn();
			TotalPrice = new DataGridViewTextBoxColumn();
			panel_Control.SuspendLayout();
			panel8.SuspendLayout();
			panel1.SuspendLayout();
			panel2.SuspendLayout();
			((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
			SuspendLayout();
			// 
			// panel_Control
			// 
			panel_Control.BackColor = Color.DimGray;
			panel_Control.Controls.Add(panel8);
			panel_Control.Controls.Add(loggedInUsername_label);
			panel_Control.Dock = DockStyle.Top;
			panel_Control.ForeColor = Color.White;
			panel_Control.Location = new Point(0, 0);
			panel_Control.Name = "panel_Control";
			panel_Control.Size = new Size(906, 30);
			panel_Control.TabIndex = 2;
			panel_Control.MouseDown += HeaderMouseDown_Event;
			// 
			// panel8
			// 
			panel8.Controls.Add(minimize_button);
			panel8.Controls.Add(maximaze_button);
			panel8.Controls.Add(exit_button);
			panel8.Dock = DockStyle.Right;
			panel8.Location = new Point(815, 0);
			panel8.Name = "panel8";
			panel8.Size = new Size(91, 30);
			panel8.TabIndex = 0;
			// 
			// minimize_button
			// 
			minimize_button.BackColor = Color.DimGray;
			minimize_button.FlatAppearance.BorderSize = 0;
			minimize_button.FlatStyle = FlatStyle.Flat;
			minimize_button.Font = new Font("Microsoft Sans Serif", 10F);
			minimize_button.ForeColor = SystemColors.WindowText;
			minimize_button.Image = Properties.Resources.subminimize_16x16_White;
			minimize_button.Location = new Point(1, 1);
			minimize_button.Name = "minimize_button";
			minimize_button.Size = new Size(30, 30);
			minimize_button.TabIndex = 7;
			minimize_button.UseVisualStyleBackColor = false;
			minimize_button.Click += minimize_button_Click;
			// 
			// maximaze_button
			// 
			maximaze_button.BackColor = Color.DimGray;
			maximaze_button.FlatAppearance.BorderSize = 0;
			maximaze_button.FlatStyle = FlatStyle.Flat;
			maximaze_button.Font = new Font("Microsoft Sans Serif", 10F);
			maximaze_button.ForeColor = SystemColors.WindowText;
			maximaze_button.Image = Properties.Resources.minimize_16x16_White;
			maximaze_button.Location = new Point(31, 1);
			maximaze_button.Name = "maximaze_button";
			maximaze_button.Size = new Size(30, 30);
			maximaze_button.TabIndex = 6;
			maximaze_button.UseVisualStyleBackColor = false;
			maximaze_button.Click += maximaze_button_Click;
			// 
			// exit_button
			// 
			exit_button.BackColor = Color.DimGray;
			exit_button.FlatAppearance.BorderSize = 0;
			exit_button.FlatStyle = FlatStyle.Flat;
			exit_button.Font = new Font("Microsoft Sans Serif", 10F);
			exit_button.ForeColor = SystemColors.WindowText;
			exit_button.Image = Properties.Resources.close_16x16_White;
			exit_button.Location = new Point(61, 1);
			exit_button.Name = "exit_button";
			exit_button.Size = new Size(30, 30);
			exit_button.TabIndex = 5;
			exit_button.UseVisualStyleBackColor = false;
			exit_button.Click += exit_button_Click;
			// 
			// loggedInUsername_label
			// 
			loggedInUsername_label.AutoSize = true;
			loggedInUsername_label.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			loggedInUsername_label.ForeColor = Color.White;
			loggedInUsername_label.Location = new Point(12, 7);
			loggedInUsername_label.Name = "loggedInUsername_label";
			loggedInUsername_label.Size = new Size(31, 22);
			loggedInUsername_label.TabIndex = 0;
			loggedInUsername_label.Text = "Text";
			loggedInUsername_label.UseCompatibleTextRendering = true;
			// 
			// panel1
			// 
			panel1.Controls.Add(totalPayment_label);
			panel1.Controls.Add(totalOrderCount_label);
			panel1.Controls.Add(label6);
			panel1.Controls.Add(label5);
			panel1.Controls.Add(totalPriceCheck_checkBox);
			panel1.Controls.Add(edit_button);
			panel1.Controls.Add(confirm_button);
			panel1.Dock = DockStyle.Bottom;
			panel1.Location = new Point(0, 436);
			panel1.Name = "panel1";
			panel1.Size = new Size(906, 61);
			panel1.TabIndex = 3;
			// 
			// totalPayment_label
			// 
			totalPayment_label.AutoSize = true;
			totalPayment_label.Font = new Font("Segoe UI", 12.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			totalPayment_label.Location = new Point(186, 30);
			totalPayment_label.Name = "totalPayment_label";
			totalPayment_label.Size = new Size(99, 23);
			totalPayment_label.TabIndex = 7;
			totalPayment_label.Text = "1234.56 TL";
			// 
			// totalOrderCount_label
			// 
			totalOrderCount_label.AutoSize = true;
			totalOrderCount_label.Font = new Font("Segoe UI", 12.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			totalOrderCount_label.Location = new Point(186, 6);
			totalOrderCount_label.Name = "totalOrderCount_label";
			totalOrderCount_label.Size = new Size(50, 23);
			totalOrderCount_label.TabIndex = 8;
			totalOrderCount_label.Text = "1234";
			// 
			// label6
			// 
			label6.AutoSize = true;
			label6.Font = new Font("Segoe UI", 12.75F);
			label6.ForeColor = SystemColors.ControlText;
			label6.Location = new Point(12, 30);
			label6.Name = "label6";
			label6.Size = new Size(168, 23);
			label6.TabIndex = 5;
			label6.Text = "Sipariş Toplam Tutar:";
			// 
			// label5
			// 
			label5.AutoSize = true;
			label5.Font = new Font("Segoe UI", 12.75F);
			label5.ForeColor = SystemColors.ControlText;
			label5.Location = new Point(17, 6);
			label5.Name = "label5";
			label5.Size = new Size(163, 23);
			label5.TabIndex = 6;
			label5.Text = "Sipariş Ürün Miktarı:";
			// 
			// totalPriceCheck_checkBox
			// 
			totalPriceCheck_checkBox.AutoSize = true;
			totalPriceCheck_checkBox.Font = new Font("Segoe UI", 12.75F, FontStyle.Bold);
			totalPriceCheck_checkBox.Location = new Point(323, 15);
			totalPriceCheck_checkBox.Name = "totalPriceCheck_checkBox";
			totalPriceCheck_checkBox.Size = new Size(211, 27);
			totalPriceCheck_checkBox.TabIndex = 2;
			totalPriceCheck_checkBox.Text = "Informations Checked!";
			totalPriceCheck_checkBox.UseVisualStyleBackColor = true;
			// 
			// edit_button
			// 
			edit_button.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold, GraphicsUnit.Point, 162);
			edit_button.Location = new Point(540, 6);
			edit_button.Name = "edit_button";
			edit_button.Size = new Size(174, 43);
			edit_button.TabIndex = 0;
			edit_button.Text = "Edit Orders";
			edit_button.UseVisualStyleBackColor = true;
			// 
			// confirm_button
			// 
			confirm_button.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold, GraphicsUnit.Point, 162);
			confirm_button.Location = new Point(720, 6);
			confirm_button.Name = "confirm_button";
			confirm_button.Size = new Size(174, 43);
			confirm_button.TabIndex = 0;
			confirm_button.Text = "Confirm Orders";
			confirm_button.UseVisualStyleBackColor = true;
			confirm_button.Click += confirm_button_Click;
			// 
			// panel2
			// 
			panel2.Controls.Add(dataGridView1);
			panel2.Dock = DockStyle.Fill;
			panel2.Location = new Point(0, 30);
			panel2.Name = "panel2";
			panel2.Size = new Size(906, 406);
			panel2.TabIndex = 4;
			// 
			// dataGridView1
			// 
			dataGridView1.AllowUserToAddRows = false;
			dataGridView1.AllowUserToDeleteRows = false;
			dataGridViewCellStyle1.BackColor = Color.FromArgb(224, 224, 224);
			dataGridView1.AlternatingRowsDefaultCellStyle = dataGridViewCellStyle1;
			dataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
			dataGridView1.AutoSizeRowsMode = DataGridViewAutoSizeRowsMode.DisplayedCellsExceptHeaders;
			dataGridView1.BackgroundColor = Color.DimGray;
			dataGridView1.BorderStyle = BorderStyle.None;
			dataGridView1.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
			dataGridViewCellStyle2.Alignment = DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle2.BackColor = Color.FromArgb(54, 64, 78);
			dataGridViewCellStyle2.Font = new Font("Segoe UI", 11.25F, FontStyle.Regular, GraphicsUnit.Point, 162);
			dataGridViewCellStyle2.ForeColor = SystemColors.Window;
			dataGridViewCellStyle2.SelectionBackColor = Color.Silver;
			dataGridViewCellStyle2.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle2.WrapMode = DataGridViewTriState.True;
			dataGridView1.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle2;
			dataGridView1.ColumnHeadersHeight = 30;
			dataGridView1.Columns.AddRange(new DataGridViewColumn[] { PName, Amount, Unit, ListPrice, TotalPrice });
			dataGridViewCellStyle3.Alignment = DataGridViewContentAlignment.MiddleLeft;
			dataGridViewCellStyle3.BackColor = Color.Gainsboro;
			dataGridViewCellStyle3.Font = new Font("Segoe UI", 9F);
			dataGridViewCellStyle3.ForeColor = SystemColors.ControlText;
			dataGridViewCellStyle3.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle3.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle3.WrapMode = DataGridViewTriState.False;
			dataGridView1.DefaultCellStyle = dataGridViewCellStyle3;
			dataGridView1.Dock = DockStyle.Fill;
			dataGridView1.Location = new Point(0, 0);
			dataGridView1.MultiSelect = false;
			dataGridView1.Name = "dataGridView1";
			dataGridView1.ReadOnly = true;
			dataGridViewCellStyle4.Alignment = DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle4.BackColor = Color.FromArgb(54, 64, 78);
			dataGridViewCellStyle4.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold, GraphicsUnit.Point, 162);
			dataGridViewCellStyle4.ForeColor = SystemColors.Window;
			dataGridViewCellStyle4.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle4.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle4.WrapMode = DataGridViewTriState.True;
			dataGridView1.RowHeadersDefaultCellStyle = dataGridViewCellStyle4;
			dataGridView1.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
			dataGridView1.Size = new Size(906, 406);
			dataGridView1.TabIndex = 1;
			// 
			// PName
			// 
			PName.FillWeight = 771.5736F;
			PName.HeaderText = "PName";
			PName.MinimumWidth = 200;
			PName.Name = "PName";
			PName.ReadOnly = true;
			// 
			// Amount
			// 
			Amount.FillWeight = 25.3807087F;
			Amount.HeaderText = "Amount";
			Amount.MinimumWidth = 100;
			Amount.Name = "Amount";
			Amount.ReadOnly = true;
			// 
			// Unit
			// 
			Unit.FillWeight = 25.3807087F;
			Unit.HeaderText = "Unit";
			Unit.MinimumWidth = 50;
			Unit.Name = "Unit";
			Unit.ReadOnly = true;
			// 
			// ListPrice
			// 
			ListPrice.FillWeight = 25.3807087F;
			ListPrice.HeaderText = "List Price";
			ListPrice.MinimumWidth = 100;
			ListPrice.Name = "ListPrice";
			ListPrice.ReadOnly = true;
			// 
			// TotalPrice
			// 
			TotalPrice.FillWeight = 25.3807087F;
			TotalPrice.HeaderText = "Total Price";
			TotalPrice.MinimumWidth = 200;
			TotalPrice.Name = "TotalPrice";
			TotalPrice.ReadOnly = true;
			// 
			// OrderDetails
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			ClientSize = new Size(906, 497);
			Controls.Add(panel2);
			Controls.Add(panel1);
			Controls.Add(panel_Control);
			FormBorderStyle = FormBorderStyle.None;
			Name = "OrderDetails";
			StartPosition = FormStartPosition.CenterScreen;
			Text = "CartDetails";
			Load += CartDetails_Load;
			panel_Control.ResumeLayout(false);
			panel_Control.PerformLayout();
			panel8.ResumeLayout(false);
			panel1.ResumeLayout(false);
			panel1.PerformLayout();
			panel2.ResumeLayout(false);
			((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
			ResumeLayout(false);
		}

		#endregion

		private Panel panel_Control;
		private Panel panel8;
		private Button minimize_button;
		private Button maximaze_button;
		private Button exit_button;
		private Label loggedInUsername_label;
		private Panel panel1;
		private Panel panel2;
		private DataGridView dataGridView1;
		private DataGridViewTextBoxColumn PName;
		private DataGridViewTextBoxColumn Amount;
		private DataGridViewTextBoxColumn Unit;
		private DataGridViewTextBoxColumn ListPrice;
		private DataGridViewTextBoxColumn TotalPrice;
		private Label totalPayment_label;
		private Label totalOrderCount_label;
		private Label label6;
		private Label label5;
		internal Button edit_button;
		internal Button confirm_button;
		internal CheckBox totalPriceCheck_checkBox;
	}
}