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
			panel1 = new Panel();
			OrderDetailed_groupBox = new GroupBox();
			richTextBox1 = new RichTextBox();
			button3 = new Button();
			button1 = new Button();
			button2 = new Button();
			CartDetails_groupBox = new GroupBox();
			label5 = new Label();
			totalPayment_label = new Label();
			confirm_button = new Button();
			totalOrderCount_label = new Label();
			edit_button = new Button();
			label6 = new Label();
			totalPriceCheck_checkBox = new CheckBox();
			panel_Control = new Panel();
			panel8 = new Panel();
			minimize_button = new Button();
			maximaze_button = new Button();
			exit_button = new Button();
			header_label = new Label();
			panel2 = new Panel();
			dataGridView1 = new DataGridView();
			Check = new DataGridViewCheckBoxColumn();
			ProductName = new DataGridViewTextBoxColumn();
			Amount = new DataGridViewTextBoxColumn();
			Unit = new DataGridViewTextBoxColumn();
			ListPrice = new DataGridViewTextBoxColumn();
			TotalPrice = new DataGridViewTextBoxColumn();
			panel1.SuspendLayout();
			OrderDetailed_groupBox.SuspendLayout();
			CartDetails_groupBox.SuspendLayout();
			panel_Control.SuspendLayout();
			panel8.SuspendLayout();
			panel2.SuspendLayout();
			((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
			SuspendLayout();
			// 
			// panel1
			// 
			panel1.Controls.Add(OrderDetailed_groupBox);
			panel1.Controls.Add(CartDetails_groupBox);
			panel1.Dock = DockStyle.Bottom;
			panel1.Location = new Point(0, 366);
			panel1.Name = "panel1";
			panel1.Size = new Size(906, 170);
			panel1.TabIndex = 3;
			// 
			// OrderDetailed_groupBox
			// 
			OrderDetailed_groupBox.Controls.Add(richTextBox1);
			OrderDetailed_groupBox.Controls.Add(button3);
			OrderDetailed_groupBox.Controls.Add(button1);
			OrderDetailed_groupBox.Controls.Add(button2);
			OrderDetailed_groupBox.Dock = DockStyle.Bottom;
			OrderDetailed_groupBox.Location = new Point(0, -2);
			OrderDetailed_groupBox.Name = "OrderDetailed_groupBox";
			OrderDetailed_groupBox.Size = new Size(906, 100);
			OrderDetailed_groupBox.TabIndex = 10;
			OrderDetailed_groupBox.TabStop = false;
			// 
			// richTextBox1
			// 
			richTextBox1.Location = new Point(12, 10);
			richTextBox1.Name = "richTextBox1";
			richTextBox1.Size = new Size(693, 85);
			richTextBox1.TabIndex = 2;
			richTextBox1.Text = "";
			// 
			// button3
			// 
			button3.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold);
			button3.Location = new Point(711, 52);
			button3.Name = "button3";
			button3.Size = new Size(86, 43);
			button3.TabIndex = 1;
			button3.Text = "IPTAL";
			button3.UseVisualStyleBackColor = true;
			// 
			// button1
			// 
			button1.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold);
			button1.Location = new Point(803, 52);
			button1.Name = "button1";
			button1.Size = new Size(86, 43);
			button1.TabIndex = 1;
			button1.Text = "ONAYLA";
			button1.UseVisualStyleBackColor = true;
			// 
			// button2
			// 
			button2.Font = new Font("Segoe UI Semibold", 10F, FontStyle.Bold);
			button2.Location = new Point(711, 10);
			button2.Name = "button2";
			button2.Size = new Size(178, 43);
			button2.TabIndex = 1;
			button2.Text = "Hepsini Isaretle";
			button2.UseVisualStyleBackColor = true;
			// 
			// CartDetails_groupBox
			// 
			CartDetails_groupBox.Controls.Add(label5);
			CartDetails_groupBox.Controls.Add(totalPayment_label);
			CartDetails_groupBox.Controls.Add(confirm_button);
			CartDetails_groupBox.Controls.Add(totalOrderCount_label);
			CartDetails_groupBox.Controls.Add(edit_button);
			CartDetails_groupBox.Controls.Add(label6);
			CartDetails_groupBox.Controls.Add(totalPriceCheck_checkBox);
			CartDetails_groupBox.Dock = DockStyle.Bottom;
			CartDetails_groupBox.Location = new Point(0, 98);
			CartDetails_groupBox.Name = "CartDetails_groupBox";
			CartDetails_groupBox.Size = new Size(906, 72);
			CartDetails_groupBox.TabIndex = 9;
			CartDetails_groupBox.TabStop = false;
			// 
			// label5
			// 
			label5.AutoSize = true;
			label5.Font = new Font("Segoe UI", 12.75F);
			label5.ForeColor = SystemColors.ControlText;
			label5.Location = new Point(12, 15);
			label5.Name = "label5";
			label5.Size = new Size(163, 23);
			label5.TabIndex = 6;
			label5.Text = "Sipariş Ürün Miktarı:";
			// 
			// totalPayment_label
			// 
			totalPayment_label.AutoSize = true;
			totalPayment_label.Font = new Font("Segoe UI", 12.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			totalPayment_label.Location = new Point(181, 39);
			totalPayment_label.Name = "totalPayment_label";
			totalPayment_label.Size = new Size(99, 23);
			totalPayment_label.TabIndex = 7;
			totalPayment_label.Text = "1234.56 TL";
			// 
			// confirm_button
			// 
			confirm_button.Enabled = false;
			confirm_button.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold, GraphicsUnit.Point, 162);
			confirm_button.Location = new Point(715, 15);
			confirm_button.Name = "confirm_button";
			confirm_button.Size = new Size(174, 43);
			confirm_button.TabIndex = 0;
			confirm_button.Text = "Confirm Orders";
			confirm_button.UseVisualStyleBackColor = true;
			confirm_button.Click += confirm_button_Click;
			// 
			// totalOrderCount_label
			// 
			totalOrderCount_label.AutoSize = true;
			totalOrderCount_label.Font = new Font("Segoe UI", 12.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			totalOrderCount_label.Location = new Point(181, 15);
			totalOrderCount_label.Name = "totalOrderCount_label";
			totalOrderCount_label.Size = new Size(50, 23);
			totalOrderCount_label.TabIndex = 8;
			totalOrderCount_label.Text = "1234";
			// 
			// edit_button
			// 
			edit_button.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold, GraphicsUnit.Point, 162);
			edit_button.Location = new Point(535, 15);
			edit_button.Name = "edit_button";
			edit_button.Size = new Size(174, 43);
			edit_button.TabIndex = 0;
			edit_button.Text = "Edit Orders";
			edit_button.UseVisualStyleBackColor = true;
			// 
			// label6
			// 
			label6.AutoSize = true;
			label6.Font = new Font("Segoe UI", 12.75F);
			label6.ForeColor = SystemColors.ControlText;
			label6.Location = new Point(7, 39);
			label6.Name = "label6";
			label6.Size = new Size(168, 23);
			label6.TabIndex = 5;
			label6.Text = "Sipariş Toplam Tutar:";
			// 
			// totalPriceCheck_checkBox
			// 
			totalPriceCheck_checkBox.AutoSize = true;
			totalPriceCheck_checkBox.Font = new Font("Segoe UI", 12.75F, FontStyle.Bold);
			totalPriceCheck_checkBox.Location = new Point(318, 24);
			totalPriceCheck_checkBox.Name = "totalPriceCheck_checkBox";
			totalPriceCheck_checkBox.Size = new Size(211, 27);
			totalPriceCheck_checkBox.TabIndex = 2;
			totalPriceCheck_checkBox.Text = "Informations Checked!";
			totalPriceCheck_checkBox.UseVisualStyleBackColor = true;
			totalPriceCheck_checkBox.CheckedChanged += totalPriceCheck_checkBox_CheckedChanged;
			// 
			// panel_Control
			// 
			panel_Control.BackColor = Color.DimGray;
			panel_Control.Controls.Add(panel8);
			panel_Control.Controls.Add(header_label);
			panel_Control.Dock = DockStyle.Top;
			panel_Control.ForeColor = Color.White;
			panel_Control.Location = new Point(0, 0);
			panel_Control.Name = "panel_Control";
			panel_Control.Size = new Size(906, 30);
			panel_Control.TabIndex = 5;
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
			// header_label
			// 
			header_label.AutoSize = true;
			header_label.Font = new Font("Segoe UI Semibold", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			header_label.ForeColor = Color.White;
			header_label.Location = new Point(12, 5);
			header_label.Name = "header_label";
			header_label.Size = new Size(31, 22);
			header_label.TabIndex = 0;
			header_label.Text = "Text";
			header_label.UseCompatibleTextRendering = true;
			// 
			// panel2
			// 
			panel2.Controls.Add(dataGridView1);
			panel2.Dock = DockStyle.Fill;
			panel2.Location = new Point(0, 30);
			panel2.Name = "panel2";
			panel2.Size = new Size(906, 336);
			panel2.TabIndex = 6;
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
			dataGridView1.Columns.AddRange(new DataGridViewColumn[] { Check, ProductName, Amount, Unit, ListPrice, TotalPrice });
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
			dataGridView1.Size = new Size(906, 336);
			dataGridView1.TabIndex = 1;
			// 
			// Check
			// 
			Check.AutoSizeMode = DataGridViewAutoSizeColumnMode.AllCellsExceptHeader;
			Check.Frozen = true;
			Check.HeaderText = "";
			Check.MinimumWidth = 30;
			Check.Name = "Check";
			Check.ReadOnly = true;
			Check.Width = 30;
			// 
			// ProductName
			// 
			ProductName.AutoSizeMode = DataGridViewAutoSizeColumnMode.None;
			ProductName.FillWeight = 771.5736F;
			ProductName.Frozen = true;
			ProductName.HeaderText = "ProductName";
			ProductName.MinimumWidth = 200;
			ProductName.Name = "ProductName";
			ProductName.ReadOnly = true;
			ProductName.Width = 415;
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
			ListPrice.HeaderText = "ListPrice";
			ListPrice.MinimumWidth = 100;
			ListPrice.Name = "ListPrice";
			ListPrice.ReadOnly = true;
			// 
			// TotalPrice
			// 
			TotalPrice.FillWeight = 25.3807087F;
			TotalPrice.HeaderText = "TotalPrice";
			TotalPrice.MinimumWidth = 200;
			TotalPrice.Name = "TotalPrice";
			TotalPrice.ReadOnly = true;
			// 
			// OrderDetails
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			ClientSize = new Size(906, 536);
			Controls.Add(panel2);
			Controls.Add(panel_Control);
			Controls.Add(panel1);
			FormBorderStyle = FormBorderStyle.None;
			Name = "OrderDetails";
			StartPosition = FormStartPosition.CenterScreen;
			Text = "CartDetails";
			Load += CartDetails_Load;
			panel1.ResumeLayout(false);
			OrderDetailed_groupBox.ResumeLayout(false);
			CartDetails_groupBox.ResumeLayout(false);
			CartDetails_groupBox.PerformLayout();
			panel_Control.ResumeLayout(false);
			panel_Control.PerformLayout();
			panel8.ResumeLayout(false);
			panel2.ResumeLayout(false);
			((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
			ResumeLayout(false);
		}

		#endregion
		private Panel panel1;
		private Label totalPayment_label;
		private Label totalOrderCount_label;
		private Label label6;
		private Label label5;
		internal Button edit_button;
		internal Button confirm_button;
		internal CheckBox totalPriceCheck_checkBox;
		private GroupBox OrderDetailed_groupBox;
		private GroupBox CartDetails_groupBox;
		internal Button button3;
		internal Button button1;
		internal Button button2;
		private RichTextBox richTextBox1;
		private Panel panel_Control;
		private Panel panel8;
		private Button minimize_button;
		private Button maximaze_button;
		private Button exit_button;
		private Label header_label;
		private Panel panel2;
		private DataGridView dataGridView1;
		private DataGridViewCheckBoxColumn Check;
		private DataGridViewTextBoxColumn ProductName;
		private DataGridViewTextBoxColumn Amount;
		private DataGridViewTextBoxColumn Unit;
		private DataGridViewTextBoxColumn ListPrice;
		private DataGridViewTextBoxColumn TotalPrice;
	}
}