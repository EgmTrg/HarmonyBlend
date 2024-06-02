namespace HarmonyBlend.Pages.Setting
{
	partial class NewProductForm
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
			panel_Control = new Panel();
			panel8 = new Panel();
			minimize_button = new Button();
			maximaze_button = new Button();
			exit_button = new Button();
			loggedInUsername_label = new Label();
			groupBox1 = new GroupBox();
			label9 = new Label();
			category_textBox = new TextBox();
			label14 = new Label();
			label7 = new Label();
			label8 = new Label();
			productUnit_comboBox = new ComboBox();
			activePassive_comboBox = new ComboBox();
			label5 = new Label();
			pcode_maskedTextBox = new MaskedTextBox();
			pname_textBox = new TextBox();
			pShortNametextBox = new TextBox();
			label3 = new Label();
			label2 = new Label();
			label1 = new Label();
			groupBox2 = new GroupBox();
			KDV_Include_textBox = new TextBox();
			kdv_groupBox = new GroupBox();
			radioButton1 = new RadioButton();
			radioButton2 = new RadioButton();
			radioButton3 = new RadioButton();
			radioButton4 = new RadioButton();
			radioButton5 = new RadioButton();
			radioButton6 = new RadioButton();
			label4 = new Label();
			KDV_except_textBox = new TextBox();
			label6 = new Label();
			saveProduct_button = new Button();
			cancel_button = new Button();
			panel_Control.SuspendLayout();
			panel8.SuspendLayout();
			groupBox1.SuspendLayout();
			groupBox2.SuspendLayout();
			kdv_groupBox.SuspendLayout();
			SuspendLayout();
			// 
			// panel_Control
			// 
			panel_Control.BackColor = Color.FromArgb(39, 47, 59);
			panel_Control.Controls.Add(panel8);
			panel_Control.Controls.Add(loggedInUsername_label);
			panel_Control.Dock = DockStyle.Top;
			panel_Control.ForeColor = Color.White;
			panel_Control.Location = new Point(0, 0);
			panel_Control.Name = "panel_Control";
			panel_Control.Size = new Size(458, 30);
			panel_Control.TabIndex = 3;
			panel_Control.MouseDown += HeaderMouseDown_Event;
			// 
			// panel8
			// 
			panel8.Controls.Add(minimize_button);
			panel8.Controls.Add(maximaze_button);
			panel8.Controls.Add(exit_button);
			panel8.Dock = DockStyle.Right;
			panel8.Location = new Point(367, 0);
			panel8.Name = "panel8";
			panel8.Size = new Size(91, 30);
			panel8.TabIndex = 0;
			// 
			// minimize_button
			// 
			minimize_button.BackColor = Color.FromArgb(39, 47, 59);
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
			maximaze_button.BackColor = Color.FromArgb(39, 47, 59);
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
			exit_button.BackColor = Color.FromArgb(39, 47, 59);
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
			loggedInUsername_label.Size = new Size(138, 22);
			loggedInUsername_label.TabIndex = 0;
			loggedInUsername_label.Text = "Create New Product | ";
			loggedInUsername_label.UseCompatibleTextRendering = true;
			// 
			// groupBox1
			// 
			groupBox1.Controls.Add(label9);
			groupBox1.Controls.Add(category_textBox);
			groupBox1.Controls.Add(label14);
			groupBox1.Controls.Add(label7);
			groupBox1.Controls.Add(label8);
			groupBox1.Controls.Add(productUnit_comboBox);
			groupBox1.Controls.Add(activePassive_comboBox);
			groupBox1.Controls.Add(label5);
			groupBox1.Controls.Add(pcode_maskedTextBox);
			groupBox1.Controls.Add(pname_textBox);
			groupBox1.Controls.Add(pShortNametextBox);
			groupBox1.Controls.Add(label3);
			groupBox1.Controls.Add(label2);
			groupBox1.Controls.Add(label1);
			groupBox1.ForeColor = SystemColors.Control;
			groupBox1.Location = new Point(12, 36);
			groupBox1.Name = "groupBox1";
			groupBox1.Size = new Size(434, 247);
			groupBox1.TabIndex = 4;
			groupBox1.TabStop = false;
			groupBox1.Text = "Stock";
			// 
			// label9
			// 
			label9.AutoSize = true;
			label9.Location = new Point(248, 204);
			label9.Name = "label9";
			label9.Size = new Size(110, 15);
			label9.TabIndex = 20;
			label9.Text = "Borek, Baklava, Tatli";
			// 
			// category_textBox
			// 
			category_textBox.Location = new Point(125, 198);
			category_textBox.Name = "category_textBox";
			category_textBox.Size = new Size(117, 23);
			category_textBox.TabIndex = 19;
			// 
			// label14
			// 
			label14.AutoSize = true;
			label14.Font = new Font("Segoe UI", 12.75F);
			label14.ForeColor = Color.White;
			label14.Location = new Point(24, 198);
			label14.Name = "label14";
			label14.Size = new Size(97, 23);
			label14.TabIndex = 18;
			label14.Text = "Kategoriler:";
			// 
			// label7
			// 
			label7.AutoSize = true;
			label7.Font = new Font("Segoe UI", 12.75F);
			label7.ForeColor = Color.White;
			label7.Location = new Point(21, 127);
			label7.Name = "label7";
			label7.Size = new Size(100, 23);
			label7.TabIndex = 14;
			label7.Text = "Ürün Birimi:";
			// 
			// label8
			// 
			label8.AutoSize = true;
			label8.Font = new Font("Segoe UI", 12.75F);
			label8.ForeColor = Color.White;
			label8.Location = new Point(22, 163);
			label8.Name = "label8";
			label8.Size = new Size(99, 23);
			label8.TabIndex = 15;
			label8.Text = "Aktif / Pasif:";
			// 
			// productUnit_comboBox
			// 
			productUnit_comboBox.AutoCompleteMode = AutoCompleteMode.SuggestAppend;
			productUnit_comboBox.AutoCompleteSource = AutoCompleteSource.ListItems;
			productUnit_comboBox.DropDownStyle = ComboBoxStyle.DropDownList;
			productUnit_comboBox.FormattingEnabled = true;
			productUnit_comboBox.Items.AddRange(new object[] { "TEPSİ", "KG", "ADET", "KOLİ", "KUTU", "PAKET" });
			productUnit_comboBox.Location = new Point(125, 126);
			productUnit_comboBox.Name = "productUnit_comboBox";
			productUnit_comboBox.Size = new Size(117, 23);
			productUnit_comboBox.TabIndex = 16;
			// 
			// activePassive_comboBox
			// 
			activePassive_comboBox.AutoCompleteMode = AutoCompleteMode.SuggestAppend;
			activePassive_comboBox.AutoCompleteSource = AutoCompleteSource.ListItems;
			activePassive_comboBox.DropDownStyle = ComboBoxStyle.DropDownList;
			activePassive_comboBox.FormattingEnabled = true;
			activePassive_comboBox.Items.AddRange(new object[] { "Aktif", "Pasif" });
			activePassive_comboBox.Location = new Point(125, 162);
			activePassive_comboBox.Name = "activePassive_comboBox";
			activePassive_comboBox.Size = new Size(117, 23);
			activePassive_comboBox.TabIndex = 17;
			// 
			// label5
			// 
			label5.AutoSize = true;
			label5.Location = new Point(251, 33);
			label5.Name = "label5";
			label5.Size = new Size(0, 15);
			label5.TabIndex = 3;
			// 
			// pcode_maskedTextBox
			// 
			pcode_maskedTextBox.Location = new Point(125, 27);
			pcode_maskedTextBox.Mask = "000.00.000";
			pcode_maskedTextBox.Name = "pcode_maskedTextBox";
			pcode_maskedTextBox.Size = new Size(117, 23);
			pcode_maskedTextBox.TabIndex = 2;
			pcode_maskedTextBox.Leave += pcode_maskedTextBox_Leave;
			// 
			// pname_textBox
			// 
			pname_textBox.Location = new Point(125, 93);
			pname_textBox.Name = "pname_textBox";
			pname_textBox.Size = new Size(262, 23);
			pname_textBox.TabIndex = 1;
			// 
			// pShortNametextBox
			// 
			pShortNametextBox.Location = new Point(125, 60);
			pShortNametextBox.Name = "pShortNametextBox";
			pShortNametextBox.Size = new Size(262, 23);
			pShortNametextBox.TabIndex = 1;
			// 
			// label3
			// 
			label3.AutoSize = true;
			label3.Font = new Font("Segoe UI", 12.75F);
			label3.Location = new Point(46, 93);
			label3.Name = "label3";
			label3.Size = new Size(75, 23);
			label3.TabIndex = 0;
			label3.Text = "Tam Adı:";
			// 
			// label2
			// 
			label2.AutoSize = true;
			label2.Font = new Font("Segoe UI", 12.75F);
			label2.Location = new Point(67, 27);
			label2.Name = "label2";
			label2.Size = new Size(54, 23);
			label2.TabIndex = 0;
			label2.Text = "Kodu:";
			// 
			// label1
			// 
			label1.AutoSize = true;
			label1.Font = new Font("Segoe UI", 12.75F);
			label1.Location = new Point(47, 60);
			label1.Name = "label1";
			label1.Size = new Size(74, 23);
			label1.TabIndex = 0;
			label1.Text = "Kısa Adı:";
			// 
			// groupBox2
			// 
			groupBox2.Controls.Add(KDV_Include_textBox);
			groupBox2.Controls.Add(kdv_groupBox);
			groupBox2.Controls.Add(label4);
			groupBox2.Controls.Add(KDV_except_textBox);
			groupBox2.Controls.Add(label6);
			groupBox2.ForeColor = SystemColors.Control;
			groupBox2.Location = new Point(12, 289);
			groupBox2.Name = "groupBox2";
			groupBox2.Size = new Size(434, 168);
			groupBox2.TabIndex = 5;
			groupBox2.TabStop = false;
			groupBox2.Text = "Price";
			// 
			// KDV_Include_textBox
			// 
			KDV_Include_textBox.Location = new Point(206, 130);
			KDV_Include_textBox.Name = "KDV_Include_textBox";
			KDV_Include_textBox.Size = new Size(181, 23);
			KDV_Include_textBox.TabIndex = 1;
			KDV_Include_textBox.TextChanged += KDV_Calculate_textBox_TextChanged;
			// 
			// kdv_groupBox
			// 
			kdv_groupBox.Controls.Add(radioButton1);
			kdv_groupBox.Controls.Add(radioButton2);
			kdv_groupBox.Controls.Add(radioButton3);
			kdv_groupBox.Controls.Add(radioButton4);
			kdv_groupBox.Controls.Add(radioButton5);
			kdv_groupBox.Controls.Add(radioButton6);
			kdv_groupBox.ForeColor = SystemColors.Control;
			kdv_groupBox.Location = new Point(24, 22);
			kdv_groupBox.Name = "kdv_groupBox";
			kdv_groupBox.Size = new Size(337, 55);
			kdv_groupBox.TabIndex = 5;
			kdv_groupBox.TabStop = false;
			kdv_groupBox.Text = "KDV";
			// 
			// radioButton1
			// 
			radioButton1.AutoSize = true;
			radioButton1.Location = new Point(280, 23);
			radioButton1.Name = "radioButton1";
			radioButton1.Size = new Size(37, 19);
			radioButton1.TabIndex = 2;
			radioButton1.Text = "20";
			radioButton1.UseVisualStyleBackColor = true;
			// 
			// radioButton2
			// 
			radioButton2.AutoSize = true;
			radioButton2.Location = new Point(231, 23);
			radioButton2.Name = "radioButton2";
			radioButton2.Size = new Size(37, 19);
			radioButton2.TabIndex = 2;
			radioButton2.Text = "18";
			radioButton2.UseVisualStyleBackColor = true;
			// 
			// radioButton3
			// 
			radioButton3.AutoSize = true;
			radioButton3.Location = new Point(172, 23);
			radioButton3.Name = "radioButton3";
			radioButton3.Size = new Size(37, 19);
			radioButton3.TabIndex = 2;
			radioButton3.Text = "10";
			radioButton3.UseVisualStyleBackColor = true;
			// 
			// radioButton4
			// 
			radioButton4.AutoSize = true;
			radioButton4.Location = new Point(124, 23);
			radioButton4.Name = "radioButton4";
			radioButton4.Size = new Size(31, 19);
			radioButton4.TabIndex = 2;
			radioButton4.Text = "8";
			radioButton4.UseVisualStyleBackColor = true;
			// 
			// radioButton5
			// 
			radioButton5.AutoSize = true;
			radioButton5.Checked = true;
			radioButton5.Location = new Point(76, 23);
			radioButton5.Name = "radioButton5";
			radioButton5.Size = new Size(31, 19);
			radioButton5.TabIndex = 2;
			radioButton5.TabStop = true;
			radioButton5.Text = "1";
			radioButton5.UseVisualStyleBackColor = true;
			// 
			// radioButton6
			// 
			radioButton6.AutoSize = true;
			radioButton6.Location = new Point(29, 23);
			radioButton6.Name = "radioButton6";
			radioButton6.Size = new Size(31, 19);
			radioButton6.TabIndex = 2;
			radioButton6.Text = "0";
			radioButton6.UseVisualStyleBackColor = true;
			// 
			// label4
			// 
			label4.AutoSize = true;
			label4.Font = new Font("Segoe UI", 12.75F);
			label4.Location = new Point(21, 130);
			label4.Name = "label4";
			label4.Size = new Size(179, 23);
			label4.TabIndex = 0;
			label4.Text = "Birim Fiyatı KDV Dahil:";
			// 
			// KDV_except_textBox
			// 
			KDV_except_textBox.Location = new Point(206, 93);
			KDV_except_textBox.Name = "KDV_except_textBox";
			KDV_except_textBox.Size = new Size(181, 23);
			KDV_except_textBox.TabIndex = 1;
			KDV_except_textBox.TextChanged += KDV_Calculate_textBox_TextChanged;
			// 
			// label6
			// 
			label6.AutoSize = true;
			label6.Font = new Font("Segoe UI", 12.75F);
			label6.Location = new Point(21, 93);
			label6.Name = "label6";
			label6.Size = new Size(179, 23);
			label6.TabIndex = 0;
			label6.Text = "Birim Fiyatı KDV Hariç:";
			// 
			// saveProduct_button
			// 
			saveProduct_button.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold, GraphicsUnit.Point, 162);
			saveProduct_button.ForeColor = SystemColors.ActiveCaptionText;
			saveProduct_button.Location = new Point(272, 463);
			saveProduct_button.Name = "saveProduct_button";
			saveProduct_button.Size = new Size(174, 43);
			saveProduct_button.TabIndex = 8;
			saveProduct_button.Text = "Save Product";
			saveProduct_button.UseVisualStyleBackColor = true;
			saveProduct_button.Click += saveProduct_button_Click;
			// 
			// cancel_button
			// 
			cancel_button.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold, GraphicsUnit.Point, 162);
			cancel_button.ForeColor = SystemColors.ActiveCaptionText;
			cancel_button.Location = new Point(12, 463);
			cancel_button.Name = "cancel_button";
			cancel_button.Size = new Size(174, 43);
			cancel_button.TabIndex = 8;
			cancel_button.Text = "Cancel";
			cancel_button.UseVisualStyleBackColor = true;
			cancel_button.Click += cancel_button_Click;
			// 
			// NewProductForm
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			BackColor = Color.FromArgb(39, 47, 59);
			ClientSize = new Size(458, 518);
			Controls.Add(cancel_button);
			Controls.Add(saveProduct_button);
			Controls.Add(groupBox2);
			Controls.Add(groupBox1);
			Controls.Add(panel_Control);
			ForeColor = SystemColors.Control;
			FormBorderStyle = FormBorderStyle.None;
			Name = "NewProductForm";
			StartPosition = FormStartPosition.CenterScreen;
			Text = "NewProductForm";
			Load += NewProductForm_Load;
			panel_Control.ResumeLayout(false);
			panel_Control.PerformLayout();
			panel8.ResumeLayout(false);
			groupBox1.ResumeLayout(false);
			groupBox1.PerformLayout();
			groupBox2.ResumeLayout(false);
			groupBox2.PerformLayout();
			kdv_groupBox.ResumeLayout(false);
			kdv_groupBox.PerformLayout();
			ResumeLayout(false);
		}

		#endregion

		private Panel panel_Control;
		private Panel panel8;
		private Button minimize_button;
		private Button maximaze_button;
		private Button exit_button;
		private Label loggedInUsername_label;
		private GroupBox groupBox1;
		private MaskedTextBox pcode_maskedTextBox;
		private TextBox pname_textBox;
		private TextBox pShortNametextBox;
		private Label label3;
		private Label label2;
		private Label label1;
		private GroupBox groupBox2;
		private TextBox KDV_Include_textBox;
		private Label label4;
		private TextBox KDV_except_textBox;
		private Label label6;
		private Button saveProduct_button;
		private GroupBox kdv_groupBox;
		private RadioButton radioButton1;
		private RadioButton radioButton2;
		private RadioButton radioButton3;
		private RadioButton radioButton4;
		private RadioButton radioButton5;
		private RadioButton radioButton6;
		private Label label5;
		private Label label14;
		private Label label7;
		private Label label8;
		private ComboBox productUnit_comboBox;
		private ComboBox activePassive_comboBox;
		private TextBox category_textBox;
		private Label label9;
		private Button cancel_button;
	}
}